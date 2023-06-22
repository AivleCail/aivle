package com.example.backend.manager.dto;

import com.example.backend.manager.entity.Manager;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class ManagerResponseDto {
    private String email;
    private String name;
    private Long managerId;


    public static ManagerResponseDto of(Manager manager) {
        return ManagerResponseDto.builder()
                .email(manager.getEmail())
                .name(manager.getName())
                .managerId(manager.getId())
                .build();
    }
}
