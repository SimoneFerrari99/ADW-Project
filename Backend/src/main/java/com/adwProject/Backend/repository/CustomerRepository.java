package com.adwProject.Backend.repository;

import com.adwProject.Backend.entity.CustomerDB;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.UUID;

@Repository
public interface CustomerRepository extends JpaRepository<CustomerDB, UUID> {

}
