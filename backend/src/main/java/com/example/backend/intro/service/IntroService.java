package com.example.backend.intro.service;

import com.example.backend.article.dto.ArticleIntroResponseDto;
import com.example.backend.article.repository.ArticleRepository;
import com.example.backend.external.dto.ExternalIntroResponseDto;
import com.example.backend.external.repository.ExternalRepository;
import com.example.backend.voc.dto.VocIntroResponseDto;

import com.example.backend.voc.repository.VocRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class IntroService {

    private final ArticleRepository ariticleRepository;
    private final ExternalRepository externalRepository;
    private final VocRepository vocRepository;

    public List<ArticleIntroResponseDto> introArticle() {
        return ariticleRepository.searchNow();
    }

    public List<ExternalIntroResponseDto> introExternal() {
        return externalRepository.searchNow();
    }

    public List<VocIntroResponseDto> introVoc() {
        return vocRepository.searchNow();

    }

}
