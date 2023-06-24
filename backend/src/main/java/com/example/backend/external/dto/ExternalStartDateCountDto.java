package com.example.backend.external.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;


@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ExternalStartDateCountDto {
    private String yearMonth;
    private Long count;
}