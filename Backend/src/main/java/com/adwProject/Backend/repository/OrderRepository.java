package com.adwProject.Backend.repository;

import com.adwProject.Backend.entity.Order;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;


@Repository
public interface OrderRepository extends JpaRepository<Order, String> {

    Optional<Order> findById(String id);

    @Query(value = "SELECT * FROM public.orders", nativeQuery = true)
    List<Order> get(Integer skip, Integer take);

    Optional<List<Order>> findByCustomerCustCode(String custCode);
}
