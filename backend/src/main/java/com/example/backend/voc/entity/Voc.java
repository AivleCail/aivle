package com.example.backend.voc.entity;

import com.example.backend.manager.entity.Manager;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Entity
@NoArgsConstructor
@Getter
public class Voc {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "voc_id")
    private Long id;

    @Column(nullable = false)
    private String customerName;

    @Column(nullable = false)
    private String customerAddress;

    @Column(nullable = false)
    private String customerPhone;

    @Column(nullable = false)
    private String type;

    @Column
    private LocalDateTime date;

    @Column
    private String status;

    @Column
    private String statusDetail;
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "manager_id")
    private Manager manager;


}