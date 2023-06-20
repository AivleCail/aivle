package com.example.backend.article.dto;

import com.example.backend.article.entity.Article;
import lombok.Builder;
import lombok.Getter;

import java.time.format.DateTimeFormatter;

@Getter
@Builder
public class ArticleIntroResponseDto {
    private Long articleId;
    private String articleTitle;
    private String managerName;
    private String createdAt;


    public static ArticleIntroResponseDto of(Article article) {
        return ArticleIntroResponseDto.builder()
                .articleId(article.getId())
                .articleTitle(article.getTitle())
                .managerName(article.getManager().getName())
                .createdAt(article.getCreatedAt().format(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss")))
                .build();
    }
}