package com.example.backend.external.dto;

import com.example.backend.external.entity.External;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.format.DateTimeFormatter;

@Getter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class ExternalResponseDto {

    private Long externalId;
    private String companyName;
    private String receiptContent;
    private String externalAddress;
    private String externalStartdate;
    private String externalEnddate;
    private String externalStatus;
    private String receiptDate;
    private boolean isWritten;

    public static ExternalResponseDto of(External external, boolean bool) {
        return ExternalResponseDto.builder()
                .externalId(external.getId())
                .companyName(external.getCompanyName())
                .receiptContent(external.getReceiptContent())
                .externalAddress(external.getExternalAddress())
                .externalStartdate(external.getExternalStartdate())
                .externalEnddate(external.getExternalEnddate())
                .externalStatus(external.getExternalStatus())
                .receiptDate(external.getReceiptDate().format(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss")))
                .isWritten(bool)
                .build();
    }

}
