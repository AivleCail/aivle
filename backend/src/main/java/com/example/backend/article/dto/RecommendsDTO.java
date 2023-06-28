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
    private int counts;


    public RecommendsDTO(Long managerId, Long articleId,int likeCount,int counts) {
        this.managerId = managerId;
        this.articleId = articleId;
        this.likeCount = likeCount;
        this.counts = counts;
    }

}
