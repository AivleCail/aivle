package com.example.backend.intro.service;

import com.example.backend.article.dto.ArticleIntroResponseDto;
import com.example.backend.article.dto.ArticleResponseDto;
import com.example.backend.article.repository.ArticleRepository;
import com.example.backend.voc.dto.VocAnswerDto;


import com.example.backend.voc.dto.VocTypeCountDto;
import com.example.backend.voc.repository.VocRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;


@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class IntroService {

    private final VocRepository vocRepository;
    private final ArticleRepository articleRepository;

    public VocTypeCountDto TypeVoc() {
        return vocRepository.searchType();
    }

    public VocAnswerDto AnswerVoc() {
        return vocRepository.searchAnswer();
    }  // << 삭제 하기

    public List<ArticleIntroResponseDto> BestArticle() {
        return articleRepository.best();
    }
}
