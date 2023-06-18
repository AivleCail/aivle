package com.example.backend.external.repository;


import com.example.backend.external.entity.External;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface WorkerExternalRepository extends JpaRepository<External, Long>, WorkerExternalRepositoryCustom{

}
