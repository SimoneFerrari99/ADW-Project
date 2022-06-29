package com.adwProject.Backend.secondary.service.user;

import com.adwProject.Backend.secondary.dto.UserInput;
import com.adwProject.Backend.secondary.entity.User;
import com.adwProject.Backend.secondary.entity.enums.Typology;
import com.adwProject.Backend.secondary.map.MapUser;
import com.adwProject.Backend.secondary.repository.UserRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestMapping;

import java.util.Optional;

@Service
@AllArgsConstructor
public class UserServiceImpl implements UserService{
    private final UserRepository userRepository;
    private final MapUser mapUser;

    @RequestMapping(value="/secondary")
    @Override
    public User getById(String id) {
        return userRepository.findById(id).orElse(null);
    }

    @RequestMapping(value="/secondary")
    @Override
    public User userAuth(String email, String password) {
        User user = userRepository.findByEmail(email).orElse(null);
        if(password.equals(user.getPw())) {
            return user;
        }
        return null;
    }
}
