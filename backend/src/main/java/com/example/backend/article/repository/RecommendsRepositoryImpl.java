package com.example.backend.article.repository;



import com.example.backend.article.dto.RecommendResponseDTO;

import com.querydsl.jpa.impl.JPAQueryFactory;

import jakarta.persistence.EntityManager;

import lombok.RequiredArgsConstructor;


import com.example.backend.article.entity.Recommend;

import static com.example.backend.article.entity.QRecommend.recommend;


@RequiredArgsConstructor

public class RecommendsRepositoryImpl implements RecommendsRepositoryCustom {


    private final JPAQueryFactory queryFactory;


    @Override

    public RecommendResponseDTO findcount(long managerId, long articleId) {




        Recommend result = queryFactory.select(recommend)

                .from(recommend)

                .where(recommend.manager.id.eq(managerId).and(recommend.article.id.eq(articleId)))

                .fetchOne();



        if (result == null) {

            RecommendResponseDTO recommendResponseDTO = RecommendResponseDTO.builder()

                    .managerId(0L)

                    .articleId(0L)

                    .counts(0)

                    .build();


            return recommendResponseDTO;

        }


        RecommendResponseDTO recommendResponseDTO = RecommendResponseDTO.builder()

                .managerId(result.getManager().getId())

                .articleId(result.getArticle().getId())

                .counts(result.getCounts())

                .build();


        return recommendResponseDTO;

    }


}
