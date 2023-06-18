package com.example.backend.manager.service;

import com.example.backend.manager.entity.Manager;
import com.example.backend.manager.repository.ManagerRespository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.Collections;

@Service
@RequiredArgsConstructor
public class CustomManagerDetailsService implements UserDetailsService {
    private final ManagerRespository managerRespository;

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        return managerRespository.findByEmail(email)
                .map(this::createUserDetails)
                .orElseThrow(() -> new UsernameNotFoundException(email + " 을 DB에서 찾을 수 없습니다"));
    }

    private UserDetails createUserDetails(Manager manager) {
        GrantedAuthority grantedAuthority = new SimpleGrantedAuthority(manager.getAuth().toString());

        return new User(
                String.valueOf(manager.getId()),
                manager.getPassword(),
                Collections.singleton(grantedAuthority)
        );
    }
}
