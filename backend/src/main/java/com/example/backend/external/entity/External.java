package com.example.backend.external.entity;

import com.example.backend.manager.entity.Manager;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

@Entity
@Getter
@AllArgsConstructor
@NoArgsConstructor
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

    @CreationTimestamp
    @Column
    private LocalDateTime receiptDate;

    @Column
    private LocalDateTime externalStartdate;


    @Column
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
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd H:mm");  // 이부분은 장고에서 어떻게 받지 정해야 함
        LocalDateTime dateTime = LocalDateTime.parse(externalStartdate, formatter);
        external.externalStartdate = dateTime;
        external.manager = manager;
        external.externalEnddate = "null";  // 문자컬럼인데 만약에
        external.externalStatus = "공사예정";      // external.externalStatus = "공사 예정";


        return external;
    }
    public static External startchangeExternal (External external) {

        external.externalStatus = "공사중";
        return external;
    }
    public static External endchangeExternal (External external) {
        LocalDateTime a = LocalDateTime.now();
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");
        String aString = a.format(formatter);
        external.externalEnddate = aString;
        external.externalStatus = "공사종료";

        return external;
    }

}