package com.adwProject.Backend.repository;

import com.adwProject.Backend.entity.AgentDB;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.UUID;

@Repository
public interface AgentRepository extends JpaRepository<AgentDB, UUID> {

}
