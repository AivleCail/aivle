package com.example.backend.voc.repository;

import com.example.backend.manager.entity.Manager;
import com.example.backend.voc.dto.VocPageResponseDto;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface VocRepositoryCustom {
    Page<VocPageResponseDto> searchAll(Pageable pageable, Long managerId);
}
