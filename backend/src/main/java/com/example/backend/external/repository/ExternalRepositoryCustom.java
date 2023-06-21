package com.example.backend.external.repository;

import com.example.backend.external.dto.ExternalIntroResponseDto;
import com.example.backend.external.dto.ExternalPageResponseDto;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface ExternalRepositoryCustom {
    Page<ExternalPageResponseDto> searchAll(Pageable pageable);

    List<ExternalIntroResponseDto> searchNow();
}