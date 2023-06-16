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
@RequestMapping("/voc")
public class VocController {
    private final VocService vocService;


    @GetMapping("/page")
    public ResponseEntity<Page<VocPageResponseDto>> pageVoc(@RequestParam(name = "page") int page,
                                                            @RequestParam(name = "managerId") Long managerId) {
        return ResponseEntity.ok(vocService.pageVoc(page, managerId));
    }

    @GetMapping("/one")
    public ResponseEntity<VocResponseDto> getOneVoc(@RequestParam(name = "id") Long id) {
        return ResponseEntity.ok(vocService.oneVoc(id));
    }

    @PostMapping("/result")
    public ResponseEntity<VocResponseDto> updataVocStatus(@RequestBody VocResultRequestDto requestDto) {
        return ResponseEntity.ok(vocService.updateVocResult(requestDto.getVoc_id(), requestDto.getVoc_status(), requestDto.getVoc_status_detail()));
    }


}
