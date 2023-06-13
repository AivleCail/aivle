package com.example.backend.article.dto;

import lombok.Getter;

@Getter
public class CreateArticleRequestDto {
    private String title;
    private String body;
    private String category;
}
