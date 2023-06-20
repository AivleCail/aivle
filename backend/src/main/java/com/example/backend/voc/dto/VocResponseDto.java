package com.example.backend.voc.dto;

import com.example.backend.voc.entity.Voc;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.format.DateTimeFormatter;

@Getter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class VocResponseDto {
    private Long vocId;
    private String customerName;
    private String customerAddress;
    private String customerPhone;
    private String type;
    private String opinion;
    private String receptionDate;
    private String checkStatus;
    private String percentage;
    private String entire;

    public static VocResponseDto of(Voc voc) {
        return VocResponseDto.builder()
                .vocId(voc.getId())
                .customerName(voc.getCustomerName())
                .customerAddress(voc.getCustomerAddress())
                .customerPhone(voc.getCustomerPhone())
                .type(voc.getType())
                .opinion(voc.getOpinion())
                .receptionDate(voc.getDate().format(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss")))
                .checkStatus(voc.getStatus())
                .percentage(voc.getPercentage())
                .entire(voc.getVocEntire())
                .build();
    }
}
