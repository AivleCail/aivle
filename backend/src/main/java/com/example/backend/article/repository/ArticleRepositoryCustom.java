package com.example.backend.article.repository;

import com.example.backend.article.dto.ArticlePageResponseDto;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface ArticleRepositoryCustom {
    Page<ArticlePageResponseDto> searchAll(Pageable pageable);
}
