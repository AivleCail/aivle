package com.example.backend.external.entity;

import com.example.backend.manager.entity.Manager;
import jakarta.persistence.*;
import lombok.Getter;

@Entity
@Getter
public class External {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "external_id")
    private Long id;

    @Column(nullable = false)
    private String companyName;


    @Column(nullable = false, columnDefinition = "TEXT")
    private String receiptContent;

    @Column(nullable = false, columnDefinition = "TEXT")
    private String externalAddress;


    @Column(nullable = false, columnDefinition = "TEXT")
    private String externalStartdate;


    @Column(columnDefinition = "TEXT")
    private String externalEnddate;

    @Column
    private String externalStatus;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "manager_id")
    private Manager manager;


    // 추후 수정해야 하는 부분임
    public static External createExternal (String companyName,String receiptContent,String externalAddress, String externalStartdate,Manager manager) {
        External external = new External();
        external.companyName = companyName;
        external.receiptContent = receiptContent;
        external.externalAddress = externalAddress;
        external.externalStartdate = externalStartdate;
        external.manager = manager;
        external.externalStatus = "x";

        return external;
    }


    public static External changeExternal (External external,String externalEnddate) {
        external.externalEnddate = externalEnddate;
        external.externalStatus = "o";

        return external;
    }

}