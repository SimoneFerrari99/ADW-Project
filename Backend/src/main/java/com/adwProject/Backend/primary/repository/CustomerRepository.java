package com.adwProject.Backend.primary.repository;

import com.adwProject.Backend.primary.entity.Customer;
import org.jetbrains.annotations.NotNull;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;


@Repository
// TODO: Inserire tutte le query
public interface CustomerRepository extends JpaRepository<Customer, String> {       //Repository is a mechanism for encapsulating storage, retrieval, and search behavior which emulates a collection of objects.

    @NotNull
    Optional<Customer> findById(String custCode);
    Optional<List<Customer>> findCustomerByAgentAgentCode(String agentCode);
}
