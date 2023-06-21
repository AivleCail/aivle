package com.example.backend.external.dto;

import com.example.backend.external.entity.External;
import lombok.Builder;
import lombok.Getter;

import java.time.format.DateTimeFormatter;


@Getter
@Builder
public class ExternalIntroResponseDto {

    private Long externalId;
    private String companyName;
    private String receiptContent;
    private String externalStartdate;
    private String externalStatus;

    public static ExternalIntroResponseDto of(External external) {
        return ExternalIntroResponseDto.builder()
                .externalId(external.getId())
                .companyName(external.getCompanyName())
                .receiptContent(external.getReceiptContent())
                //.externalStartdate(external.getExternalStartdate())
                .externalStartdate(external.getExternalStartdate().format(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss")))
                .externalStatus(external.getExternalStatus())
                .build();
    }
}