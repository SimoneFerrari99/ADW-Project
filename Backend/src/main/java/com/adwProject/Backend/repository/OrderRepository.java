package com.adwProject.Backend.repository;

import com.adwProject.Backend.entity.Order;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;


@Repository
public interface OrderRepository extends JpaRepository<Order, Long> {

    Optional<Order> findById(Long id);

    @Query(value = "SELECT * FROM public.listing ORDER BY created_at OFFSET ?1*?2 LIMIT ?2", nativeQuery = true)
    List<Order> get(Integer skip, Integer take);
}
