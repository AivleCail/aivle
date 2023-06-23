package com.example.backend.voc.repository;

import com.example.backend.voc.dto.VocAnswerDto;
import com.example.backend.voc.dto.VocIntroResponseDto;
import com.example.backend.voc.dto.VocPageResponseDto;
import com.example.backend.voc.dto.VocTypeCountDto;
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

    @Override
    public List<VocIntroResponseDto> searchNow() {
        QVoc voc = QVoc.voc; // Assuming QVoc is the generated Q-class for your Voc entity

        List<Voc> content = queryFactory
                .selectFrom(voc)
                .where()
                .orderBy(voc.date.desc())
                .limit(4)
                .fetch();

        List<VocIntroResponseDto> Vocs = content
                .stream()
                .map(VocIntroResponseDto::of)
                .collect(Collectors.toList());

        return Vocs;
    }

    public VocTypeCountDto searchType() {
        QVoc voc = QVoc.voc; // Assuming QVoc is the generated Q-class for your Voc entity

        List<Voc> content = queryFactory
                .selectFrom(voc)
                .where()
                .orderBy(voc.date.desc())
                .fetch();

        long statusCount = 0;
        long tvCount = 0;
        long internetCount = 0;
        long phoneCount = 0;

        for (Voc vocs : content) {
            String type = vocs.getType();
            if (type.equals("전화")) {
                phoneCount++;
            } else if (type.equals("인터넷")) {
                internetCount++;
            } else if (type.equals("TV")) {
                tvCount++;
            }
            statusCount++;
        }

        VocTypeCountDto vocTypeCountDto = new VocTypeCountDto();
        vocTypeCountDto.setStatusCount(statusCount);
        vocTypeCountDto.setTvCount(tvCount);
        vocTypeCountDto.setInternetCount(internetCount);
        vocTypeCountDto.setPhoneCount(phoneCount);

        return vocTypeCountDto;
    }

    public VocAnswerDto searchAnswer() {
        QVoc voc = QVoc.voc;

        List<Voc> content = queryFactory
                .selectFrom(voc)
                .where(voc.percentage.endsWith("%"))
                .orderBy(voc.date.desc())
                .fetch();


        long totalAnswer = 0;
        long goodAnswer = 0;
        long badAnswer = 0;
        long veryBadAnswer = 0;

        for (Voc vocA : content) {
            String status = vocA.getStatus();
            String per = vocA.getPercentage();
            String percents  = per.substring(0,2);
            int percent = Integer.parseInt(percents);

            if (status.equals("해제")){
                goodAnswer++;
            }else{
                if (percent >= 85.0){
                    veryBadAnswer++;
                }else{
                    badAnswer++;
                }
            }
            totalAnswer++;
        }

        VocAnswerDto vocAnswerDto = new VocAnswerDto();
        vocAnswerDto.setTotalAnswer(totalAnswer);
        vocAnswerDto.setGoodAnswer(goodAnswer);
        vocAnswerDto.setBadAnswer(badAnswer);
        vocAnswerDto.setVeryBadAnswer(veryBadAnswer);

        return vocAnswerDto;
    }


}
