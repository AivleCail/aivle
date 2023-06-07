package com.example.backend.manager.entity;

import jakarta.persistence.*;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter @Setter
@Builder
@NoArgsConstructor
public class Manager {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column
    private String password;

    @Column
    private String email;

    @Column
    private String name;

    @Column
    private String address;
    @Column
    private String phone;

    @Enumerated(EnumType.STRING)
    private Authority authority;

    @Builder
    public Manager(Long id, String password, String email, String name, String address, String phone, Authority authority) {
        this.id = id;
        this.password = password;
        this.email = email;
        this.name = name;
        this.address = address;
        this.phone = phone;
        this.authority = authority;

    }
}
