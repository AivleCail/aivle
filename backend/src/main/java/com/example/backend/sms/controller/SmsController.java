package com.example.backend.sms.controller;

import com.example.backend.sms.dto.SmsMessageDto;
import com.example.backend.sms.dto.SmsResponseDto;
import com.example.backend.sms.service.SmsService;
import com.fasterxml.jackson.core.JsonProcessingException;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

import java.io.UnsupportedEncodingException;
import java.net.URISyntaxException;
import java.security.InvalidKeyException;
import java.security.NoSuchAlgorithmException;
import java.util.ArrayList;
import java.util.List;

@Controller
@RequiredArgsConstructor
public class SmsController {
    private final SmsService smsService;

    @PostMapping("/sms/send")
    public ResponseEntity<List<SmsResponseDto>> sendSms(@RequestBody List<SmsMessageDto> messageDtoList) throws UnsupportedEncodingException, URISyntaxException, NoSuchAlgorithmException, InvalidKeyException, JsonProcessingException {
        List<SmsResponseDto> responseDtoList = new ArrayList<>();
        for (SmsMessageDto messageDto : messageDtoList) {
            SmsResponseDto responseDto = smsService.sendSms(messageDto);
            responseDtoList.add(responseDto);
        }
        return ResponseEntity.ok(responseDtoList);
    }
}
