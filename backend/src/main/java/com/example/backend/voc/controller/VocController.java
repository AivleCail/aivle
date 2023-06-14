package com.example.backend.voc.controller;

import com.example.backend.voc.dto.VocPageResponseDto;
import com.example.backend.voc.service.VocService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

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


}
