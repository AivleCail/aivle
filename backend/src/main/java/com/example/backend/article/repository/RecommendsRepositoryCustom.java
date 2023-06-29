package com.example.backend.article.repository;

import com.example.backend.article.dto.RecommendResponseDTO;

public interface RecommendsRepositoryCustom {


    RecommendResponseDTO findcount(long managerId, long articleId);
}