package com.example.backend.voc.entity;

import com.example.backend.manager.entity.Manager;
import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDateTime;

@Entity
@NoArgsConstructor
@AllArgsConstructor
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

    @CreationTimestamp
    @Column
    private LocalDateTime date;

    @Column
    private String status;

    @Column
    private String percentage;

    @Column(length = 2000)
    private String vocEntire;
    @Column
    private String opinion;
    @Column
    private String statusDetail;
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "manager_id")
    private Manager manager;

    public static Voc createVoc (String customerName, String address, String phoneNumber, String type, String opinion, Manager manager) {
        Voc voc = new Voc();
        voc.customerName = customerName;
        voc.customerAddress = address;
        voc.customerPhone = phoneNumber;
        voc.type = type;
        voc.opinion = opinion;
        voc.status = "미해결";
        voc.manager = manager;

        return voc;
    }
    public static Voc updateStatus (Voc voc, String voc_status, String voc_status_detail, String percentage, String voc_entire) {
        voc.status = voc_status;
        voc.statusDetail = voc_status_detail;
        voc.percentage = percentage;
        voc.vocEntire = voc_entire;

        return voc;
    }

}