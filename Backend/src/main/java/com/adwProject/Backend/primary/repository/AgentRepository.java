package com.adwProject.Backend.primary.repository;

import com.adwProject.Backend.primary.entity.Agent;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;


public interface AgentRepository extends JpaRepository<Agent, String> {

    Optional<Agent> findById(String id);

}
