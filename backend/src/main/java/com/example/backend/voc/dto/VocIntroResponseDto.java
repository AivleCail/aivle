package com.example.backend.voc.dto;

import com.example.backend.voc.entity.Voc;
import lombok.Builder;
import lombok.Getter;


@Getter
@Builder
public class VocIntroResponseDto {

    private Long vocId;
    private String customerName;
    private String customerAddress;
    private String type;
    private String checkStatus;

    public static VocIntroResponseDto of(Voc voc) {
        return VocIntroResponseDto.builder()
                .vocId(voc.getId())
                .customerName(voc.getCustomerName())
                .customerAddress(voc.getCustomerAddress())
                .type(voc.getType())
                .checkStatus(voc.getStatus())
                .build();
    }
}
