package com.example.backend.article.dto;

import com.example.backend.article.entity.Article;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.format.DateTimeFormatter;

@Getter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class ArticleResponseDto {
    private Long articleId;
    private Long managerId;
    private String managerName;
    private String articleTitle;
    private String articleBody;
    private String category;
    private String createdAt;
    private String updatedAt;
    private int likeCount; //총 좋아요 숫자
    private boolean isWritten;


    public static ArticleResponseDto of(Article article, boolean bool) {
        return ArticleResponseDto.builder()
                .articleId(article.getId())
                .managerId(article.getManager().getId())
                .managerName(article.getManager().getName())
                .articleTitle(article.getTitle())
                .articleBody(article.getBody())
                .category(article.getCategory())
                .createdAt(article.getCreatedAt().format(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss")))
                .updatedAt(article.getUpdatedAt().format(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss")))
                .likeCount(article.getLikeCount())
                .isWritten(bool)
                .build();
    }
}