package com.example.backend.external.repository;


import com.example.backend.external.dto.ExternalPageResponseDto;
import com.example.backend.external.dto.ExternalStartDateCountDto;
import com.example.backend.external.dto.ExternalStatusCountDto;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface ExternalRepositoryCustom {
    Page<ExternalPageResponseDto> searchAll(Pageable pageable);

    List<ExternalStartDateCountDto> getExternalStartDateCounts();

    List<ExternalStatusCountDto> getExternalStatusCounts();
}