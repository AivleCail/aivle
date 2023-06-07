package com.example.backend.manager.service;

import com.example.backend.config.jwt.TokenProvider;
import com.example.backend.config.jwt.dto.TokenDto;
import com.example.backend.manager.dto.ManagerRequestDto;
import com.example.backend.manager.dto.ManagerResponseDto;
import com.example.backend.manager.entity.Manager;
import com.example.backend.manager.repository.ManagerRespository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
@Transactional
public class AuthService {
    private final AuthenticationManagerBuilder managerBuilder;
    private final ManagerRespository managerRespository;
    private final PasswordEncoder passwordEncoder;
    private final TokenProvider tokenProvider;

    public ManagerResponseDto signup(ManagerRequestDto requestDto) {
        if (managerRespository.existsByEmail(requestDto.getEmail())) {
            throw new RuntimeException("이미 가입되어 있는 유저입니다");
        }

        Manager manager = requestDto.toManager(passwordEncoder);
        return ManagerResponseDto.of(managerRespository.save(manager));
    }

    public TokenDto login(ManagerRequestDto requestDto) {
        UsernamePasswordAuthenticationToken authenticationToken = requestDto.toAuthentication();

        Authentication authentication = managerBuilder.getObject().authenticate(authenticationToken);

        return tokenProvider.generateTokenDto(authentication);
    }

}