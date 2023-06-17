package com.example.backend.external.controller;

import com.example.backend.external.dto.*;
import com.example.backend.external.service.ExternalService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/external")
public class ExternalController {

    private final ExternalService externalService;

    //페이지 조회
    @GetMapping("/page")
    public ResponseEntity<Page<ExternalPageResponseDto>> pageExternal(@RequestParam(name = "page") int page) {
        return ResponseEntity.ok(externalService.pageExternal(page));
    }


    //  공사 시작 정보 받음
    @PostMapping("/")
    public ResponseEntity<ExternalResponseDto> createExternal(@RequestBody CreateExternalRequestDto request) {
        return ResponseEntity.ok(externalService.postExternal(request.getCompanyName(), request.getReceiptContent(),request.getExternalAddress(),request.getExternalStartdate()));

    }

    //  공사 종료 정보
    @PostMapping("/result")
    public ResponseEntity<ExternalResponseDto> ChangeExternal(@RequestBody ChangeExternalRequestDto request) {
        return ResponseEntity.ok(externalService.changeExternal(request.getId(),request.getExternalEnddate()));
    }


    // 공사 정보 하나 보는거
    @GetMapping("/one")
    public ResponseEntity<ExternalResponseDto> getOneExternal(@RequestParam(name = "id") Long id) {
        return ResponseEntity.ok(externalService.oneExternal(id));
    }


}
