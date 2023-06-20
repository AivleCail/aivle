package com.example.backend.voc.dto;

import com.example.backend.voc.entity.Voc;
import lombok.Builder;
import lombok.Getter;

import java.time.format.DateTimeFormatter;

@Getter
@Builder
public class VocPageResponseDto {
    private Long vocId;
    private String customerName;
    private String customerAddress;
    private String customerPhone;
    private String type;
    private String receptionDate;
    private String checkStatus;
    private String percentage;

    public static VocPageResponseDto of(Voc voc) {
        return VocPageResponseDto.builder()
                .vocId(voc.getId())
                .customerName(voc.getCustomerName())
                .customerAddress(voc.getCustomerAddress())
                .customerPhone(voc.getCustomerPhone())
                .type(voc.getType())
//                .receptionDate(voc.getDate().format(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss")))
                .receptionDate(voc.getDate())
                .checkStatus(voc.getStatus())
                .percentage(voc.getPercentage())
                .build();
    }
}
