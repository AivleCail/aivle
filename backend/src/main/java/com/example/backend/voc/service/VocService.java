package com.example.backend.voc.service;

import com.example.backend.config.SecurityUtil;
import com.example.backend.manager.entity.Manager;
import com.example.backend.manager.repository.ManagerRespository;
import com.example.backend.voc.dto.VocPageResponseDto;
import com.example.backend.voc.entity.Voc;
import com.example.backend.voc.repository.VocRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class VocService {
    private final VocRepository vocRepository;
    private final ManagerRespository managerRespository;

    public List<VocPageResponseDto> allVoc() {
        List<Voc> vocs = vocRepository.findAll();
        return vocs
                .stream()
                .map(VocPageResponseDto::of)
                .collect(Collectors.toList());

    }

    public Page<VocPageResponseDto> pageVoc(int pageNum, Long managerId) {
        return vocRepository.searchAll(PageRequest.of(pageNum-1,20),managerId);
    }

    public Manager isManagerCurrent() {
        return managerRespository.findById(SecurityUtil.getCurrentManagerId())
                .orElseThrow(() -> new RuntimeException("로그인 유저 정보가 없습니다"));
    }

}
