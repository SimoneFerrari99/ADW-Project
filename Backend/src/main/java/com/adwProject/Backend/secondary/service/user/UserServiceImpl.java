package com.adwProject.Backend.secondary.service.user;

import com.adwProject.Backend.secondary.entity.User;
import com.adwProject.Backend.secondary.repository.UserRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestMapping;

@Service
@AllArgsConstructor
public class UserServiceImpl implements UserService{
    private final UserRepository userRepository;

    @RequestMapping(value="/secondary")
    @Override
    public User getById(String id) {
        return userRepository.findById(id).orElse(null);
    }
}
