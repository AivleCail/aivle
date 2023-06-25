package com.example.backend.external.repository;


import com.example.backend.external.dto.ExternalPageResponseDto;

import com.example.backend.external.dto.ExternalStartDateCountDto;
import com.example.backend.external.dto.ExternalStatusCountDto;
import com.example.backend.external.entity.External;
import com.querydsl.core.Tuple;
import com.querydsl.core.types.dsl.Expressions;
import com.querydsl.jpa.impl.JPAQueryFactory;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;

import java.util.List;
import java.util.stream.Collectors;

import static com.example.backend.external.entity.QExternal.external;

@RequiredArgsConstructor
public class ExternalRepositoryImpl implements ExternalRepositoryCustom{


    private final JPAQueryFactory queryFactory;

    @Override
    public Page<ExternalPageResponseDto> searchAll(Pageable pageable) {

        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        long specificMemberId = Long.parseLong(authentication.getName());

        List<External> contents = queryFactory
                .selectFrom(external)
//                .where(external.manager.id.eq(specificMemberId))
                .orderBy(external.id.desc())
                .offset(pageable.getOffset())
                .limit(pageable.getPageSize())
                .fetch();

        List<ExternalPageResponseDto> pages = contents
                .stream()
                .map(ExternalPageResponseDto::of)
                .collect(Collectors.toList());

        int totalSize = queryFactory
                .selectFrom(external)
//                .where(external.manager.id.eq(specificMemberId))
                .fetch()
                .size();

        return new PageImpl<>(pages, pageable, totalSize);
    }

    @Override
    public List<ExternalStartDateCountDto> getExternalStartDateCounts() {
        List<Tuple> result = queryFactory
                .select(Expressions.stringTemplate("DATE_FORMAT({0}, '%Y-%m')", external.externalStartdate).as("yearMonth"),
                        external.count())
                .from(external)
                .groupBy(Expressions.stringTemplate("DATE_FORMAT({0}, '%Y-%m')", external.externalStartdate))
                .orderBy(Expressions.stringTemplate("DATE_FORMAT({0}, '%Y-%m')", external.externalStartdate).asc())
                .fetch();

        List<ExternalStartDateCountDto> dtoList = result
                .stream()
                .map(tuple -> new ExternalStartDateCountDto(tuple.get(0, String.class), tuple.get(1, Long.class)))
                .collect(Collectors.toList());

        return dtoList;
    }

    @Override
    public List<ExternalStatusCountDto> getExternalStatusCounts() {
        List<Tuple> result = queryFactory
                .select(external.externalStatus.as("status"), external.count().as("total"))
                .from(external)
                .groupBy(external.externalStatus)
                .fetch();

        List<ExternalStatusCountDto> dtoList = result
                .stream()
                .map(tuple -> new ExternalStatusCountDto(tuple.get(0, String.class), tuple.get(1, Long.class)))
                .collect(Collectors.toList());

        return dtoList;
    }
}

