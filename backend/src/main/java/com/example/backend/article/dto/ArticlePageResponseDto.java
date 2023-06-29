package com.example.backend.article.dto;

import com.example.backend.article.entity.Article;
import lombok.Builder;
import lombok.Getter;

import java.time.format.DateTimeFormatter;

@Getter
@Builder
public class ArticlePageResponseDto {
    private Long articleId;
    private String articleTitle;
    private String managerName;
    private String createdAt;
    private String category;
    private int count;
    private int likeCount;


    public static ArticlePageResponseDto of(Article article) {
        return ArticlePageResponseDto.builder()
                .articleId(article.getId())
                .articleTitle(article.getTitle())
                .managerName(article.getManager().getName())
                .createdAt(article.getCreatedAt().format(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss")))
                .count(article.getCount())
                .category(article.getCategory())
                .likeCount(article.getLikeCount())
                .build();
    }
}

