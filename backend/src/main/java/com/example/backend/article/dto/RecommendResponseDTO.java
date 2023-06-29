package com.example.backend.article.dto;

import com.example.backend.article.entity.Article;
import com.example.backend.article.entity.Recommend;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.format.DateTimeFormatter;

@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class RecommendResponseDTO {

    private Long managerId;
    private Long articleId;
    private int counts;

}
