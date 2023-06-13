package com.example.backend.article.dto;

import lombok.Getter;

@Getter
public class ChangeArticleRequestDto {
    private Long id;
    private String title;
    private String body;
    private String category;
}
