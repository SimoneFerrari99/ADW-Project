package com.adwProject.Backend.service.user;

import com.adwProject.Backend.entity.User;
import com.adwProject.Backend.repository.UserRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class UserServiceImpl implements UserService{
    private final UserRepository userRepository;

    @Override
    public User getById(String id) {
        return userRepository.findById(id).orElse(null);
    }
}
