package com.example.backend.voc.repository;

import com.example.backend.voc.dto.VocPageResponseDto;
import com.example.backend.voc.entity.QVoc;
import com.example.backend.voc.entity.Voc;
import com.querydsl.core.types.dsl.BooleanExpression;
import com.querydsl.jpa.impl.JPAQueryFactory;
import jakarta.persistence.EntityManager;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;

import java.util.List;
import java.util.stream.Collectors;


public class VocRepositoryImpl implements VocRepositoryCustom{
    private final JPAQueryFactory queryFactory;

    public VocRepositoryImpl(EntityManager em) {
        this.queryFactory = new JPAQueryFactory(em);
    }
    @Override
    public Page<VocPageResponseDto> searchAll(Pageable pageable, Long managerId) {
        QVoc voc = QVoc.voc; // Assuming QVoc is the generated Q-class for your Voc entity

        BooleanExpression managerIdPredicate = voc.manager.id.eq(managerId);

        List<Voc> content = queryFactory
                .selectFrom(voc)
                .where(managerIdPredicate)
                .offset(pageable.getOffset())
                .limit(pageable.getPageSize())
                .fetch();

        List<VocPageResponseDto> pages = content
                .stream()
                .map(VocPageResponseDto::of)
                .collect(Collectors.toList());

        long totalCount = queryFactory
                .selectFrom(voc)
                .where(managerIdPredicate)
                .fetchCount();

        return new PageImpl<>(pages, pageable, totalCount);
    }
}
