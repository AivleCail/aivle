package com.example.backend.voc.controller;

import com.example.backend.article.dto.ArticleResponseDto;
import com.example.backend.voc.dto.VocPageResponseDto;
import com.example.backend.voc.dto.VocResponseDto;
import com.example.backend.voc.dto.VocResultRequestDto;
import com.example.backend.voc.service.VocService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/vocResult")
public class VocResultController {
    private final VocService vocService;
    @PostMapping
    public ResponseEntity<VocResponseDto> updataVocStatus(@RequestBody VocResultRequestDto requestDto) {
        return ResponseEntity.ok(vocService.updateVocResult(requestDto.getVoc_id(), requestDto.getVoc_status(), requestDto.getVoc_status_detail(), requestDto.getPercentage(), requestDto.getVoc_entire()));
    }


}
