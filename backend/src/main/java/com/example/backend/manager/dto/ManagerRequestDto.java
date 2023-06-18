package com.example.backend.manager.dto;

import com.example.backend.manager.entity.Authority;
import com.example.backend.manager.entity.Manager;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;

@Getter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class ManagerRequestDto {
    private String email;
    private String password;
    private String name;
    private String auth;

    public Manager toManager(PasswordEncoder passwordEncoder) {
        return Manager.builder()
                .email(email)
                .password(passwordEncoder.encode(password))
                .name(name)
                .authority(Authority.ROLE_USER)
                .auth(auth)
                .build();
    }

    public UsernamePasswordAuthenticationToken toAuthentication() {
        return new UsernamePasswordAuthenticationToken(email, password);
    }
}
