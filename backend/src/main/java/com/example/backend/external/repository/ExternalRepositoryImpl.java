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

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.stream.Collectors;

import static com.example.backend.external.entity.QExternal.external;

@RequiredArgsConstructor
public class ExternalRepositoryImpl implements ExternalRepositoryCustom {


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

        LocalDate currentDate = LocalDate.now();
        LocalDate endDate = currentDate.plusDays(6); // Add 6 days to get the next 7 days

        DateTimeFormatter dateFormatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");

        LocalDateTime startDateTime = currentDate.atStartOfDay();
        LocalDateTime endDateTime = endDate.atStartOfDay().plusDays(1); // Add 1 day to include the end date

        List<LocalDate> dateRange = currentDate.datesUntil(endDate.plusDays(1)).collect(Collectors.toList());

        List<Tuple> result = queryFactory
                .select(
                        Expressions.stringTemplate("DATE_FORMAT({0}, '%Y-%m-%d')", external.externalStartdate).as("date"),
                        external.count()
                )
                .from(external)
                .where(external.externalStartdate.between(startDateTime, endDateTime))
                .groupBy(Expressions.stringTemplate("DATE_FORMAT({0}, '%Y-%m-%d')", external.externalStartdate))
                .orderBy(Expressions.stringTemplate("DATE_FORMAT({0}, '%Y-%m-%d')", external.externalStartdate).asc())
                .fetch();

        List<ExternalStartDateCountDto> dtoList = dateRange
                .stream()
                .map(date -> {
                    String formattedDate = date.format(dateFormatter);
                    long count = result.stream()
                            .filter(tuple -> tuple.get(0, String.class).equals(formattedDate))
                            .findFirst()
                            .map(tuple -> tuple.get(1, Long.class))
                            .orElse(0L);
                    return new ExternalStartDateCountDto(formattedDate, count);
                })
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

