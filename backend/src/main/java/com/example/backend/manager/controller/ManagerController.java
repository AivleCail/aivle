package com.example.backend.manager.controller;

import com.example.backend.config.jwt.TokenProvider;
import com.example.backend.config.jwt.dto.TokenDto;
import com.example.backend.manager.dto.ChangePasswordRequestDto;
import com.example.backend.manager.dto.ManagerRequestDto;
import com.example.backend.manager.dto.ManagerResponseDto;
import com.example.backend.manager.service.ManagerService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/member")
public class ManagerController {

    private final ManagerService managerService;


    @GetMapping("/me")
    public ResponseEntity<ManagerResponseDto> getMyMemberInfo() {
        ManagerResponseDto myInfoBySecurity = managerService.getMyInfoBySecurity();
        System.out.println(myInfoBySecurity.getName());
        return ResponseEntity.ok((myInfoBySecurity));
        // return ResponseEntity.ok(memberService.getMyInfoBySecurity());
    }

    @PostMapping("/name")
    public ResponseEntity<ManagerResponseDto> setMembername(@RequestBody ManagerRequestDto request) {
        return ResponseEntity.ok(managerService.changeManagername(request.getEmail(), request.getName()));
    }

    @PostMapping("/password")
    public ResponseEntity<ManagerResponseDto> setMemberPassword(@RequestBody ChangePasswordRequestDto request) {
        return ResponseEntity.ok(managerService.changeMemberPassword(request.getExPassword(), request.getNewPassword()));
    }
}