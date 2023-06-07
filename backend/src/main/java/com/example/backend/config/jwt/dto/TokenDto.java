package com.example.backend.config.jwt.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
//@AllArgsConstructor
@Builder
public class TokenDto {
    private String grantType;
    private String accessToken;
    private Long tokenExpiresIn;

    @Builder
    public TokenDto(String grantType, String accessToken, Long tokenExpiresIn) {
        this.grantType = grantType;
        this.accessToken = accessToken;
        this.tokenExpiresIn = tokenExpiresIn;
    }
}