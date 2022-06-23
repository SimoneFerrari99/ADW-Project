package com.adwProject.Backend.repository;

import com.adwProject.Backend.entity.Agent;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;


public interface AgentRepository extends JpaRepository<Agent, Long> {

    Optional<Agent> findById(Long id);

    @Query(value = "SELECT * FROM public.AGENTS ORDER BY created_at OFFSET ?1*?2 LIMIT ?2", nativeQuery = true)
    List<Agent> get(Integer skip, Integer take);
}
