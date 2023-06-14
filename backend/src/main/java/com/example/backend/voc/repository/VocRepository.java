package com.example.backend.voc.repository;

import com.example.backend.voc.entity.Voc;
import org.springframework.data.jpa.repository.JpaRepository;

public interface VocRepository extends JpaRepository<Voc, Long>, VocRepositoryCustom {
}
