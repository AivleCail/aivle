package com.example.backend.intro.controller;



import com.example.backend.article.dto.ArticleIntroResponseDto;
import com.example.backend.external.dto.ExternalStartDateCountDto;
import com.example.backend.external.dto.ExternalStatusCountDto;
import com.example.backend.external.service.ExternalService;
import com.example.backend.intro.service.IntroService;
import com.example.backend.voc.dto.VocAnswerDto;

import com.example.backend.voc.dto.VocTypeCountDto;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;


@RestController
@RequiredArgsConstructor
@RequestMapping("/intro")
public class IntroController {

    private final ExternalService externalService;
    private final IntroService introService;

    //월별 사외공사 건수
    @GetMapping("/external-week-count")
    public ResponseEntity<List<ExternalStartDateCountDto>> getExternalStartDateCount() {
        return ResponseEntity.ok(externalService.getExternalStartDateCount());
    }

    //사외공사 진행현황 비율
    @GetMapping("/external-status")
    public ResponseEntity<List<ExternalStatusCountDto>> getExternalStatusCount() {
        return ResponseEntity.ok(externalService.getExternalStatusCount());
    }


    //전체 발생오류중 유형 분석
    @GetMapping("/voc-total")
    public ResponseEntity<VocTypeCountDto> vocTypeCount() {
        return ResponseEntity.ok(introService.TypeVoc());
    }

    //전체 발생오류중 응답 유형
    @GetMapping("/voc-answer")
    public ResponseEntity<VocAnswerDto> vocAnswer() {
        return ResponseEntity.ok(introService.AnswerVoc());
    }


    @GetMapping("/article")
    public ResponseEntity<List<ArticleIntroResponseDto>> bestArticle() {
        return ResponseEntity.ok(introService.BestArticle());
    }

}
