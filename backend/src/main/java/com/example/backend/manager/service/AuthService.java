package com.example.backend.manager.service;

import com.example.backend.config.jwt.TokenProvider;
import com.example.backend.config.jwt.dto.TokenDto;
import com.example.backend.manager.dto.ManagerRequestDto;
import com.example.backend.manager.dto.ManagerResponseDto;
import com.example.backend.manager.entity.Manager;
import com.example.backend.manager.repository.ManagerRepository;
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
    private final ManagerRepository managerRepository;
    private final PasswordEncoder passwordEncoder;
    private final TokenProvider tokenProvider;

    public ManagerResponseDto signup(ManagerRequestDto requestDto) {
        if (managerRepository.existsByEmail(requestDto.getEmail())) {
            throw new RuntimeException("이미 가입되어 있는 유저입니다");
        }

        Manager manager = requestDto.toManager(passwordEncoder);
        return ManagerResponseDto.of(managerRepository.save(manager));
    }

    public TokenDto login(ManagerRequestDto requestDto) {
        String email = requestDto.getEmail();
        String password = requestDto.getPassword();
        String auth = requestDto.getAuth();

        Manager manager = managerRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("로그인 유저 정보가 없습니다"));

        if (!passwordEncoder.matches(password, manager.getPassword())) {
            throw new RuntimeException("비밀번호가 맞지 않습니다");
        }

        if (!auth.equals(manager.getAuth())) {
            throw new IllegalArgumentException("올바른 권한을 입력해주세요");
        }

        UsernamePasswordAuthenticationToken authenticationToken = new UsernamePasswordAuthenticationToken(email, password);
        Authentication authentication = managerBuilder.getObject().authenticate(authenticationToken);

        return tokenProvider.generateTokenDto(authentication);
    }
}
