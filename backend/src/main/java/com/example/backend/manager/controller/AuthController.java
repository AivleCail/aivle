package com.example.backend.manager.controller;

import com.example.backend.config.jwt.TokenProvider;
import com.example.backend.config.jwt.dto.TokenDto;
import com.example.backend.manager.dto.ManagerRequestDto;
import com.example.backend.manager.dto.ManagerResponseDto;
import com.example.backend.manager.service.AuthService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
public class AuthController {
    private final AuthService authService;

    private final TokenProvider tokenProvider;
    @PostMapping("/signup")
    public ResponseEntity<ManagerResponseDto> signup(@RequestBody ManagerRequestDto requestDto) {
        return ResponseEntity.ok(authService.signup(requestDto));
    }

    @PostMapping("/login")
    public ResponseEntity<TokenDto> login(@RequestBody ManagerRequestDto requestDto) {
        return ResponseEntity.ok(authService.login(requestDto));
    }

    @PostMapping("/refresh-token")
    public TokenDto refreshToken(@RequestBody TokenDto tokenDto) {
        String refreshToken = tokenDto.getRefreshToken();
        if (tokenProvider.validateToken(refreshToken)) {
            Authentication authentication = tokenProvider.getAuthentication(refreshToken);

            // 새로운 액세스 토큰 생성
            TokenDto newTokenDto = tokenProvider.generateTokenDto(authentication);
            System.out.println("새로운 액세스 토큰:" + newTokenDto.getRefreshToken());
            // 새로운 토큰 DTO를 클라이언트로 전송합니다.
            return newTokenDto;
        } else {
            throw new RuntimeException("유효하지 않은 리프레시 토큰입니다.");
        }
    }

}