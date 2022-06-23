package com.adwProject.Backend.repository;

import com.adwProject.Backend.Models.Agent;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;



@Repository
public interface AgentRepository extends JpaRepository<Agent, Long> {

}
