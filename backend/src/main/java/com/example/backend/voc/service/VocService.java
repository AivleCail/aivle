package com.example.backend.voc.service;

import com.example.backend.config.SecurityUtil;
import com.example.backend.manager.entity.Manager;
import com.example.backend.manager.repository.ManagerRepository;
import com.example.backend.voc.dto.VocPageResponseDto;
import com.example.backend.voc.dto.VocResponseDto;
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
    private final ManagerRepository managerRepository;

    public List<VocPageResponseDto> allVoc() {
        List<Voc> vocs = vocRepository.findAll();
        return vocs
                .stream()
                .map(VocPageResponseDto::of)
                .collect(Collectors.toList());

    }

    //사용 X
//    public Page<VocPageResponseDto> pageVoc(int pageNum, Long managerId) {
//        return vocRepository.searchAll(PageRequest.of(pageNum-1,1000),managerId);
//    }
    public Page<VocPageResponseDto> pageVoc(int pageNum) {
        return vocRepository.searchAll(PageRequest.of(pageNum-1,1000));
    }

    public VocResponseDto oneVoc(Long id) {
        Voc voc = vocRepository.findById(id).orElseThrow(() -> new RuntimeException("해당 voc가 없습니다."));
        return VocResponseDto.of(voc);
    }

    public Manager isManagerCurrent() {
        return managerRepository.findById(SecurityUtil.getCurrentManagerId())
                .orElseThrow(() -> new RuntimeException("로그인 유저 정보가 없습니다"));
    }

    @Transactional
    public VocResponseDto updateVocResult(Long id, String status, String statusDetail, String percentage, String entire) {
        Voc voc = vocRepository.findById(id).orElseThrow(() -> new RuntimeException(("voc가 없습니다.")));
        String a="test";
        if (status.equals("O")) {
            a = "해결";
        }
        else if(status.equals("X")) {
            a = "재조치필요";
        }
        return VocResponseDto.of(vocRepository.save(Voc.updateStatus(voc, a, statusDetail, percentage, entire)));
    }

}
