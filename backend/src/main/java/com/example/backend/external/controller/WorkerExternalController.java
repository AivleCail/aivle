package com.example.backend.external.controller;



import com.example.backend.external.dto.CreateExternalRequestDto;
import com.example.backend.external.dto.ExternalPageResponseDto;
import com.example.backend.external.dto.ExternalResponseDto;
import com.example.backend.external.service.ExternalService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/worker")
public class WorkerExternalController {

    private final ExternalService externalService;


    //로그인한 사용자 페이지를 다받음
    @GetMapping("/page")
    public ResponseEntity<Page<ExternalPageResponseDto>> WorkerPageExternal(@RequestParam(name = "page") int page) {
        return ResponseEntity.ok(externalService.WorkerPageExternal(page));
    }


    //  공사 시작 정보 받음
    @PostMapping("/result")
    public ResponseEntity<ExternalResponseDto> createExternal(@RequestBody CreateExternalRequestDto request) {
        return ResponseEntity.ok(externalService.postExternal(request.getCompanyName(), request.getReceiptContent(),request.getExternalAddress(),request.getExternalStartdate()));
    }




    // 공사 에정 -> 중
    @PostMapping("/start")
    public ResponseEntity<ExternalResponseDto> startExternal(@RequestParam(name = "id") Long id) {
        return ResponseEntity.ok(externalService.startExternal(id));
    }

    // 공사 에정 -> 중
    @PostMapping("/end")
    public ResponseEntity<ExternalResponseDto> endExternal(@RequestParam(name = "id") Long id) {
        return ResponseEntity.ok(externalService.endExternal(id));
    }



    // 공사 정보 하나 보는거
    @GetMapping("/one")
    public ResponseEntity<ExternalResponseDto> getOneExternal(@RequestParam(name = "id") Long id) {
        return ResponseEntity.ok(externalService.oneExternal(id));
    }




}