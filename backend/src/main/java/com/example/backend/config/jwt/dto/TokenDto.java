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
    private String refreshToken;
    private Long refreshTokenExpiresIn;
    private String name;

    @Builder
    public TokenDto(String grantType, String accessToken, Long tokenExpiresIn, String refreshToken, Long refreshTokenExpiresIn, String name) {
        this.grantType = grantType;
        this.accessToken = accessToken;
        this.tokenExpiresIn = tokenExpiresIn;
        this.refreshToken = refreshToken;
        this.refreshTokenExpiresIn = refreshTokenExpiresIn;
        this.name = name;
    }
}