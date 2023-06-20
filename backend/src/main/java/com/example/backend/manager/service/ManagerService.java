package com.example.backend.manager.service;

import com.example.backend.config.SecurityUtil;
import com.example.backend.manager.dto.ManagerResponseDto;
import com.example.backend.manager.entity.Manager;
import com.example.backend.manager.repository.ManagerRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class ManagerService {
    private final ManagerRepository managerRepository;
    private final PasswordEncoder passwordEncoder;

    public ManagerResponseDto getMyInfoBySecurity() {
        return managerRepository.findById(SecurityUtil.getCurrentManagerId())
                .map(ManagerResponseDto::of)
                .orElseThrow(() -> new RuntimeException("로그인 유저 정보가 없습니다"));
    }

    @Transactional
    public ManagerResponseDto changeManagername(String email, String name) {
        Manager manager = managerRepository.findByEmail(email).orElseThrow(() -> new RuntimeException("로그인 유저 정보가 없습니다"));
        manager.setName(name);
        return ManagerResponseDto.of(managerRepository.save(manager));
    }

    @Transactional
    public ManagerResponseDto changeMemberPassword(String exPassword, String newPassword) {
        Manager manager = managerRepository.findById(SecurityUtil.getCurrentManagerId()).orElseThrow(() -> new RuntimeException("로그인 유저 정보가 없습니다"));
        if (!passwordEncoder.matches(exPassword, manager.getPassword())) {
            throw new RuntimeException("비밀번호가 맞지 않습니다");
        }
        manager.setPassword(passwordEncoder.encode((newPassword)));
        return ManagerResponseDto.of(managerRepository.save(manager));
    }
}