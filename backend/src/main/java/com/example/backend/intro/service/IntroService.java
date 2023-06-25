package com.example.backend.intro.service;

import com.example.backend.voc.dto.VocAnswerDto;


import com.example.backend.voc.dto.VocTypeCountDto;
import com.example.backend.voc.repository.VocRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;



@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class IntroService {

    private final VocRepository vocRepository;


    public VocTypeCountDto TypeVoc() {
        return vocRepository.searchType();
    }

    public VocAnswerDto AnswerVoc() {
        return vocRepository.searchAnswer();
    }
}
