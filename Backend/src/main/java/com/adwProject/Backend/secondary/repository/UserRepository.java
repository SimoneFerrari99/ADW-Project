package com.adwProject.Backend.secondary.repository;

import com.adwProject.Backend.secondary.entity.User;
import com.adwProject.Backend.secondary.entity.enums.Typology;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, String> {           //Repository is a mechanism for encapsulating storage, retrieval, and search behavior which emulates a collection of objects.

    Optional<User> findById(String code);
    Optional<User> findByEmail(String email);
}
