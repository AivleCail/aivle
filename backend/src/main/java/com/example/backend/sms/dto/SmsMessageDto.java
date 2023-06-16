package com.example.backend.sms.dto;

import lombok.*;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Builder
public class SmsMessageDto {
    private String to;
    private String content;
}
