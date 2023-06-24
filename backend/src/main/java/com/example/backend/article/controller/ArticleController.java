package com.example.backend.article.controller;

import com.example.backend.article.dto.*;
import com.example.backend.article.service.ArticleService;
import com.example.backend.article.service.CommentService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/article")
public class ArticleController {
    private final ArticleService articleService;
    private final CommentService commentService;

    @GetMapping("/page")
    public ResponseEntity<Page<ArticlePageResponseDto>> pageArticle(@RequestParam(name = "page") int page) {
        return ResponseEntity.ok(articleService.pageArticle(page));
    }

    @GetMapping("/one")
    public ResponseEntity<ArticleResponseDto> getOneArticle(@RequestParam(name = "id") Long id) {
        return ResponseEntity.ok(articleService.oneArticle(id));
    }

    @PostMapping("/")
    public ResponseEntity<ArticleResponseDto> createArticle(@RequestBody CreateArticleRequestDto request) {
        return ResponseEntity.ok(articleService.postArticle(request.getTitle(), request.getBody(), request.getCategory()));
    }

    @GetMapping("/change")
    public ResponseEntity<ArticleResponseDto> getChangeArticle(@RequestParam(name = "id") Long id) {
        return ResponseEntity.ok(articleService.oneArticle((id)));
    }

    @PutMapping("/")
    public ResponseEntity<ArticleResponseDto> putChangeArticle(@RequestBody ChangeArticleRequestDto request) {
        return ResponseEntity.ok(articleService.changeArticle(
                request.getId(), request.getTitle(), request.getBody(), request.getCategory()
        ));
    }

    @DeleteMapping("/one")
    public ResponseEntity<MessageDto> deleteArticle(@RequestParam(name = "id") Long id) {
        // 게시글에 연관된 모든 댓글 삭제
        commentService.removeAllCommentsByArticleId(id);

        // 게시글 삭제
        articleService.deleteArticle(id);
        return ResponseEntity.ok(new MessageDto("Success"));
    }

}