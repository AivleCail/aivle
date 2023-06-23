package com.example.backend.voc.dto;


import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;


@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class VocTypeCountDto {
    private long statusCount;
    private long tvCount;
    private long internetCount;
    private long phoneCount;

}
