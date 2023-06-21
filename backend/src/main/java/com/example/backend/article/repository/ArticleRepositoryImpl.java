package com.example.backend.article.repository;

import com.example.backend.article.dto.ArticleIntroResponseDto;
import com.example.backend.article.dto.ArticlePageResponseDto;
import com.example.backend.article.entity.Article;
import com.querydsl.jpa.impl.JPAQueryFactory;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;

import java.util.List;
import java.util.stream.Collectors;

import static com.example.backend.article.entity.QArticle.article;

@RequiredArgsConstructor
public class ArticleRepositoryImpl implements ArticleRepositoryCustom{

    private final JPAQueryFactory queryFactory;

    @Override
    public Page<ArticlePageResponseDto> searchAll(Pageable pageable) {


        List<Article> content = queryFactory
                .selectFrom(article)
                .orderBy(article.id.desc())
                .offset(pageable.getOffset())
                .limit(pageable.getPageSize())
                .fetch();

        List<ArticlePageResponseDto> pages = content
                .stream()
                .map(ArticlePageResponseDto::of)
                .collect(Collectors.toList());

        int totalSize = queryFactory
                .selectFrom(article)
                .fetch()
                .size();

        return new PageImpl<>(pages, pageable, totalSize);
    }


    @Override
    public List<ArticleIntroResponseDto> searchNow() {



        List<Article> content = queryFactory
                .selectFrom(article)
                .where(article.category.eq("공지"))
                .orderBy(article.createdAt.desc())
                .limit(4)
                .fetch();

        List<ArticleIntroResponseDto> Articles = content
                .stream()
                .map(ArticleIntroResponseDto::of)
                .collect(Collectors.toList());

        return Articles;
    }


}