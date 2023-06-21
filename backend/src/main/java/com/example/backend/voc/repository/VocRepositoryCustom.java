package com.example.backend.voc.repository;

import com.example.backend.manager.entity.Manager;
import com.example.backend.voc.dto.VocIntroResponseDto;
import com.example.backend.voc.dto.VocPageResponseDto;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface VocRepositoryCustom {
    Page<VocPageResponseDto> searchAll(Pageable pageable, Long managerId);

    List<VocIntroResponseDto> searchNow();

}
