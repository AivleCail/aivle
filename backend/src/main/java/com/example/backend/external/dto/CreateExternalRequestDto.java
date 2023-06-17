package com.example.backend.external.dto;

import lombok.Getter;

@Getter
public class CreateExternalRequestDto {
    private String companyName;
    private String receiptContent;
    private String externalAddress;
    private String externalStartdate;
}