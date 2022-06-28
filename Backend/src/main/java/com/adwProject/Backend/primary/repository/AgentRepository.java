package com.adwProject.Backend.primary.repository;

import com.adwProject.Backend.primary.entity.Agent;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;


public interface AgentRepository extends JpaRepository<Agent, String> {

    Optional<Agent> findById(String id);

    @Query(value = "SELECT * FROM public.agents", nativeQuery = true)
    List<Agent> get(Integer skip, Integer take);
}
