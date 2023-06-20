package com.example.backend.voc.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Getter
public class VocResultRequestDto {
    private Long voc_id;
    private String voc_status;
    private String voc_status_detail;
    private String percentage;
    private String voc_entire;

}
