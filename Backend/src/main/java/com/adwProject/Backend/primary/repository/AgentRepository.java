package com.adwProject.Backend.primary.repository;

import com.adwProject.Backend.primary.entity.Agent;
import org.jetbrains.annotations.NotNull;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;


@Repository
public interface AgentRepository extends JpaRepository<Agent, String> {     //Repository is a mechanism for encapsulating storage, retrieval, and search behavior which emulates a collection of objects.

    @NotNull
    Optional<Agent> findById(@NotNull String agentCode);

}
