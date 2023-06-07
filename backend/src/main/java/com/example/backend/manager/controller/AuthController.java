package com.example.backend.manager.controller;

import com.example.backend.config.jwt.dto.TokenDto;
import com.example.backend.manager.dto.ManagerRequestDto;
import com.example.backend.manager.dto.ManagerResponseDto;
import com.example.backend.manager.service.AuthService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
public class AuthController {
    private final AuthService authService;

    @PostMapping("/signup")
    public ResponseEntity<ManagerResponseDto> signup(@RequestBody ManagerRequestDto requestDto) {
        return ResponseEntity.ok(authService.signup(requestDto));
    }

    @PostMapping("/login")
    public ResponseEntity<TokenDto> login(@RequestBody ManagerRequestDto requestDto) {
        return ResponseEntity.ok(authService.login(requestDto));
    }
}