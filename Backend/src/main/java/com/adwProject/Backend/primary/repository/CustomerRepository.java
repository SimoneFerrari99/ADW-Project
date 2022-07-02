package com.adwProject.Backend.primary.repository;

import com.adwProject.Backend.primary.entity.Customer;
import org.jetbrains.annotations.NotNull;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;


@Repository
public interface CustomerRepository extends JpaRepository<Customer, String> {

    @NotNull
    Optional<Customer> findById(String id);
    Optional<List<Customer>> findAgentByAgentAgentCode(String agentCode);
}
