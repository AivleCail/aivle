package com.example.backend.voc.entity;

import com.example.backend.manager.entity.Manager;
import com.example.backend.manager.repository.ManagerRepository;
import com.example.backend.voc.repository.VocRepository;
import lombok.RequiredArgsConstructor;
import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;
import org.json.simple.parser.JSONParser;

import java.io.FileReader;
import java.io.Reader;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

@Component
@RequiredArgsConstructor
public class JsonProcessor implements CommandLineRunner {

    private final VocRepository vocRepository;
    private final ManagerRepository managerRepository;
    @Override
    public void run(String... args) throws Exception {
        JSONParser parser = new JSONParser();
        Reader reader = new FileReader("src/main/resources/testVoc.json");
        JSONArray dateArray = (JSONArray) parser.parse(reader);
        for (int i=0; i< dateArray.size(); i++) {
            JSONObject element = (JSONObject) dateArray.get(i);
            Long vocId = (Long) element.get("voc_id");
            String customerName = (String) element.get("customer_name");
            String customerAddress = (String) element.get("customer_address");
            String customerPhone = (String) element.get("customer_phone");
            String type = (String) element.get("type");
            String d = (String) element.get("date");
            DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd H:mm:ss");
            LocalDateTime dateTime = LocalDateTime.parse(d, formatter);
            LocalDateTime date =dateTime;
            String status = (String) element.get("status");
            String percentage = (String) element.get("percentage");
            String entire = (String) element.get("entire");
            String opinion = (String) element.get("opinion");
            String detail = (String) element.get("status_detail");
            Long managerId = (Long) element.get("manager_id");
            Manager manager = managerRepository.findById(managerId)
                    .orElseThrow(() -> new IllegalArgumentException("Manager not found with id: " + managerId));
            Voc voc = new Voc(vocId, customerName, customerAddress, customerPhone, type, date, status, percentage, entire, opinion, detail, manager);
            // Voc 저장
            vocRepository.save(voc);
        }

    }
}
