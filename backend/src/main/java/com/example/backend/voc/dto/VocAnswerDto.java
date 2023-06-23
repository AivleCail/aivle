package com.example.backend.voc.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class VocAnswerDto {
    private long totalAnswer;
    private long goodAnswer;
    private long badAnswer;
    private long veryBadAnswer;

}
