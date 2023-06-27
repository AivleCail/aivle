package com.example.backend.article.dto;

import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Builder
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class RecommendsDTO {

    private Long managerId;
    private Long articleId;
    private int likeCount;


    public RecommendsDTO(Long managerId, Long articleId,int likeCount) {
        this.managerId = managerId;
        this.articleId = articleId;
        this.likeCount = likeCount;
    }

}
