package com.adwProject.Backend.primary.repository;

import com.adwProject.Backend.primary.entity.Order;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;


@Repository
public interface OrderRepository extends JpaRepository<Order, Integer> {

    Optional<Order> findById(int ordNum);
    Optional<List<Order>> findByCustomerCustCode(String custCode);
    Optional<List<Order>> findByAgentAgentCode(String agentCode);
}
