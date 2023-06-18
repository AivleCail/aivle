package com.example.backend.external.service;

import com.example.backend.config.SecurityUtil;
import com.example.backend.external.dto.ExternalPageResponseDto;
import com.example.backend.external.dto.ExternalResponseDto;
import com.example.backend.external.entity.External;
import com.example.backend.external.repository.ExternalRepository;
import com.example.backend.external.repository.WorkerExternalRepository;
import com.example.backend.manager.entity.Manager;
import com.example.backend.manager.repository.ManagerRespository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class ExternalService {

    private final ExternalRepository externalRepository;
    private final ManagerRespository managerRespository;
    private final WorkerExternalRepository workerexternalRepository;


    // 매니저가 모든 정보를 조회하는 페이지
    public Page<ExternalPageResponseDto> pageExternal(int pageNum) {
        return externalRepository.searchAll(PageRequest.of(pageNum - 1, 20));
    }

    // 로그인한 사용자가 모든 정보를 조회하는 페이지
    public Page<ExternalPageResponseDto> WorkerPageExternal(int pageNum) {
        return workerexternalRepository.searchWorker(PageRequest.of(pageNum - 1, 20));
    }



    public ExternalResponseDto oneExternal(Long id) {
        External external = externalRepository.findById(id).orElseThrow(() -> new RuntimeException("공사 정보가 없습니다."));
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication == null || authentication.getPrincipal() == "anonymousUser") {
            return ExternalResponseDto.of(external, false);
        } else {
            Manager manager = managerRespository.findById(Long.parseLong(authentication.getName())).orElseThrow();
            boolean result = external.getManager().equals(manager);
            return ExternalResponseDto.of(external, result);
        }
    }




    //
    @Transactional
    public ExternalResponseDto postExternal(String companyName,String receiptContent,String externalAddress, String externalStartdate) {

        Manager manager = isManagerCurrent();
        External external  = External.createExternal(companyName, receiptContent,externalAddress, externalStartdate ,manager);
        return ExternalResponseDto.of(externalRepository.save(external), true);
    }






    // 이게 그냥 id만 받고 시간을 로컬로 바꾸는 건데 이게  맞는건지?
    @Transactional
    public ExternalResponseDto startExternal(Long id) {//String content
        External external = authorizationExternalWriter(id);
        return ExternalResponseDto.of(externalRepository.save(External.startchangeExternal(external)), true);
    }

    @Transactional
    public ExternalResponseDto endExternal(Long id) {//String content
        External external = authorizationExternalWriter(id);
        return ExternalResponseDto.of(externalRepository.save(External.endchangeExternal(external)), true);
    }



    public Manager isManagerCurrent() {
        return managerRespository.findById(SecurityUtil.getCurrentManagerId())
                .orElseThrow(() -> new RuntimeException("로그인 유저 정보가 없습니다"));
    }

    public External authorizationExternalWriter(Long id) {
        Manager manager = isManagerCurrent();
        External external = externalRepository.findById(id).orElseThrow(() -> new RuntimeException("글이 없습니다."));
        if (!external.getManager().equals(manager)) {
            throw new RuntimeException("로그인한 유저와 작성 유저가 같지 않습니다.");
        }
        return external;
    }



}
