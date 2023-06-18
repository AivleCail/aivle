package com.example.backend.external.dto;

import com.example.backend.external.entity.External;
import lombok.Builder;
import lombok.Getter;

import java.time.format.DateTimeFormatter;

@Getter
@Builder
public class ExternalPageResponseDto {

    private Long externalId;
    private String companyName;
    private String receiptContent;
    private String externalAddress;
    private String receiptDate;
    private String externalStartdate;
    private String externalEnddate;
    private String externalStatus;



    public static ExternalPageResponseDto of(External external) {
        return ExternalPageResponseDto.builder()
                .externalId(external.getId())
                .companyName(external.getCompanyName())
                .receiptContent(external.getReceiptContent())
                .externalAddress(external.getExternalAddress())
                .receiptDate(external.getReceiptDate().format(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss")))
                .externalStartdate(external.getExternalStartdate())
                .externalEnddate(external.getExternalEnddate())
                .externalStatus(external.getExternalStatus())
                .build();
    }

}