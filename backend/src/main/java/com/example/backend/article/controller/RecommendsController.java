package com.example.backend.article.controller;



import com.example.backend.article.dto.CommentResponseDto;

import com.example.backend.article.dto.RecommendResponseDTO;

import com.example.backend.article.dto.RecommendsDTO;

import com.example.backend.article.entity.Recommend;

import com.example.backend.article.service.RecommendServices;

import jakarta.validation.Valid;

import lombok.RequiredArgsConstructor;

import lombok.extern.slf4j.Slf4j;

import org.springframework.http.ResponseEntity;

import org.springframework.web.bind.annotation.*;





@Slf4j

@RestController

@RequiredArgsConstructor

@RequestMapping("/recommend")

public class RecommendsController {


    private final RecommendServices recommendServices;


    @PostMapping("/")

    public ResponseEntity<?> insert(@RequestBody @Valid RecommendsDTO recommendsDTO) {

        recommendServices.insert(recommendsDTO);

        return ResponseEntity.ok().build();

    }


    @DeleteMapping("/one")

    public ResponseEntity<?> delete(@RequestBody @Valid RecommendsDTO recommendsDTO) {

        recommendServices.delete(recommendsDTO);

        return ResponseEntity.ok().build();

    }


    @PostMapping("/check")

    public Boolean checkRecommendations(@RequestBody @Valid RecommendsDTO recommendsDTO) {

        int like = recommendsDTO.getLikeCount();

        boolean Recommendation = recommendServices.hasRecommendation(recommendsDTO.getManagerId(), recommendsDTO.getArticleId());


        return Recommendation;

    }


    @GetMapping("/one")

    public ResponseEntity<RecommendResponseDTO> checkcounts(@RequestParam(name = "managerId") Long managerId,@RequestParam(name = "articleId") Long articleId) {


        return ResponseEntity.ok(recommendServices.recommendserch(managerId, articleId));

    }



}
