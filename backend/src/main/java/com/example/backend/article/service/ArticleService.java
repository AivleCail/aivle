package com.example.backend.article.service;

import com.example.backend.article.dto.ArticlePageResponseDto;
import com.example.backend.article.dto.ArticleResponseDto;
import com.example.backend.article.entity.Article;
import com.example.backend.article.repository.ArticleRepository;
import com.example.backend.config.SecurityUtil;
import com.example.backend.manager.entity.Manager;
import com.example.backend.manager.repository.ManagerRespository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class ArticleService {
    private final ArticleRepository articleRepository;
    private final ManagerRespository managerRespository;

    @Transactional
    public ArticleResponseDto oneArticle(Long id) {
        Article article = articleRepository.findById(id).orElseThrow(() -> new RuntimeException("글이 없습니다."));

        // 조회수 증가 로직
        int cnt = article.getCount();
        article.setCount(cnt + 1);
        articleRepository.save(article);

        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication == null || authentication.getPrincipal() == "anonymousUser") {
            return ArticleResponseDto.of(article, false);
        } else {
            Manager manager = managerRespository.findById(Long.parseLong(authentication.getName())).orElseThrow();
            boolean result = article.getManager().equals(manager);
            return ArticleResponseDto.of(article, result);
        }
    }

    public Page<ArticlePageResponseDto> pageArticle(int pageNum) {
        return articleRepository.searchAll(PageRequest.of(pageNum - 1, 20));
    }


    @Transactional
    public ArticleResponseDto postArticle(String title, String body, String category) {
        Manager manager = isManagerCurrent();
        Article article = Article.createArticle(title, body, category, manager);
        return ArticleResponseDto.of(articleRepository.save(article), true);
    }

    @Transactional
    public ArticleResponseDto changeArticle(Long id, String title, String body, String category) {
        Article article = authorizationArticleWriter(id);
        return ArticleResponseDto.of(articleRepository.save(Article.changeArticle(article, title, body, category)), true);
    }

    @Transactional
    public void deleteArticle(Long id) {
        Article article = authorizationArticleWriter(id);
        articleRepository.delete(article);
    }

    public Manager isManagerCurrent() {
        return managerRespository.findById(SecurityUtil.getCurrentManagerId())
                .orElseThrow(() -> new RuntimeException("로그인 유저 정보가 없습니다"));
    }

    public Article authorizationArticleWriter(Long id) {
        Manager manager = isManagerCurrent();
        Article article = articleRepository.findById(id).orElseThrow(() -> new RuntimeException("글이 없습니다."));
        if (!article.getManager().equals(manager)) {
            throw new RuntimeException("로그인한 유저와 작성 유저가 같지 않습니다.");
        }
        return article;
    }
}