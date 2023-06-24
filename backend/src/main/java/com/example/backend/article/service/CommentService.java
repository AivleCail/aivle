package com.example.backend.article.service;

import com.example.backend.article.dto.CommentResponseDto;
import com.example.backend.article.entity.Article;
import com.example.backend.article.entity.Comment;
import com.example.backend.article.repository.ArticleRepository;
import com.example.backend.article.repository.CommentRepository;
import com.example.backend.config.SecurityUtil;
import com.example.backend.manager.entity.Manager;
import com.example.backend.manager.repository.ManagerRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Collections;
import java.util.Comparator;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;
import java.util.stream.Stream;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class CommentService {
    private final ArticleRepository articleRepository;
    private final ManagerRepository managerRepository;
    private final CommentRepository commentRepository;

    public List<CommentResponseDto> getComment(Long id) {
        Article article = articleRepository.findById(id).orElseThrow(() -> new RuntimeException("댓글이 없습니다."));
        List<Comment> comments = commentRepository.findAllByArticle(article);
        if (comments.isEmpty()) {
            return Collections.emptyList();
        }
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication == null || authentication.getPrincipal() == "anonymousUser") {
            return comments
                    .stream()
                    .map(comment -> CommentResponseDto.of(comment, false))
                    .collect(Collectors.toList());
        } else {
            Manager manager = managerRepository.findById(Long.parseLong(authentication.getName())).orElseThrow();
            Map<Boolean, List<Comment>> collect = comments.stream()
                    .collect(
                            Collectors.partitioningBy(
                                    comment -> comment.getManager().equals(manager)
                            )
                    );
            List<CommentResponseDto> tCollect = collect.get(true).stream()
                    .map(t -> CommentResponseDto.of(t, true))
                    .collect(Collectors.toList());
            List<CommentResponseDto> fCollect = collect.get(false).stream()
                    .map(f -> CommentResponseDto.of(f, false))
                    .collect(Collectors.toList());

            return Stream
                    .concat(tCollect.stream() ,fCollect.stream())
                    .sorted(Comparator.comparing(CommentResponseDto::getCommentId))
                    .collect(Collectors.toList());
        }
    }

    @Transactional
    public CommentResponseDto createComment(Long id, String text) {
        Manager manager = managerRepository.findById(
                        SecurityUtil.getCurrentManagerId())
                .orElseThrow(() -> new RuntimeException("로그인 유저 정보가 없습니다"));
        Article article = articleRepository.findById(id).orElseThrow(() -> new RuntimeException("댓글이 없습니다."));

        Comment comment = Comment.builder()
                .text(text)
                .article(article)
                .manager(manager)
                .build();

        return CommentResponseDto.of(commentRepository.save(comment), true);
    }

    // 게시글 삭제시 댓글 작성자와 관계없이 댓글 삭제 기능
    @Transactional
    public void removeAllCommentsByArticleId(Long articleId) {
        commentRepository.deleteAllByArticleId(articleId);
    }

    @Transactional
    public void removeComment(Long id) {
        Manager manager = managerRepository.findById(
                        SecurityUtil.getCurrentManagerId())
                .orElseThrow(() -> new RuntimeException("로그인 하십시오"));
        Comment comment = commentRepository.findById(id).orElseThrow(() -> new RuntimeException("댓글이 없습니다."));
        if (!comment.getManager().equals(manager)) {
            throw new RuntimeException("작성자와 로그인이 일치하지 않습니다.");
        }
        commentRepository.delete(comment);
    }
}