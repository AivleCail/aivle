package com.example.backend.intro.controller;



import com.example.backend.article.dto.ArticleIntroResponseDto;
import com.example.backend.article.service.ArticleService;
import com.example.backend.external.dto.ExternalIntroResponseDto;
import com.example.backend.external.dto.ExternalStartDateCountDto;
import com.example.backend.external.service.ExternalService;
import com.example.backend.intro.service.IntroService;
import com.example.backend.voc.dto.VocIntroResponseDto;

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

    private final ArticleService articleService;
    private final ExternalService externalService;

    private final IntroService introService;

    //오늘의 공지사항
    @GetMapping("/article")
    public ResponseEntity<List<ArticleIntroResponseDto>> introArticle() {
        return ResponseEntity.ok(introService.introArticle());
    }

    //오늘의 사외공사
    @GetMapping("/external")
    public ResponseEntity<List<ExternalIntroResponseDto>> introExternal() {
        return ResponseEntity.ok(introService.introExternal());
    }

    //오늘의 voc
    @GetMapping("/voc")
    public ResponseEntity<List<VocIntroResponseDto>> introVoc() {

        return ResponseEntity.ok(introService.introVoc());
    }

    //월별 사외공사 건수
    @GetMapping("/external-month-count")
    public ResponseEntity<List<ExternalStartDateCountDto>> getExternalStartDateCount() {
        return ResponseEntity.ok(externalService.getExternalStartDateCount());
    }





}
