package com.adwProject.Backend.secondary.repository;

import com.adwProject.Backend.secondary.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, String> {

    Optional<User> findById(String id);

    @Query(value = "SELECT * FROM public.users", nativeQuery = true)
    List<User> get(Integer skip, Integer take);
}
