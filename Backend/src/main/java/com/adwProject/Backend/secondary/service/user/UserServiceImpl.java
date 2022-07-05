package com.adwProject.Backend.secondary.service.user;

import com.adwProject.Backend.secondary.dto.UserInput;
import com.adwProject.Backend.secondary.entity.User;
import com.adwProject.Backend.secondary.map.MapUser;
import com.adwProject.Backend.secondary.repository.UserRepository;
import com.adwProject.Backend.utility.Utility;
import graphql.GraphQLException;
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
    public User getById(String code) {
        return userRepository.findById(code).orElse(null);
    }

    @RequestMapping(value="/secondary")
    @Override
    public User userAuth(String email, String password) {
        User user = userRepository.findByEmail(email).orElse(null);
        password = Utility.hashPassword(password);
        if(user!=null && password.equals(user.getPw())) {
            return user;
        }
        return null;
    }

    @RequestMapping(value="/secondary")
    @Override
    public Boolean updatePassword(String code, String password) {
        Optional<User> optionalUser = userRepository.findById(code);
        User user;

        if(optionalUser.isPresent()) {
            user = optionalUser.get();
            password = Utility.hashPassword(password);
            user.setPw(password);
            userRepository.save(user);
            return true;
        }
        return false;
    }

    @RequestMapping(value="/secondary")
    @Override
    public Boolean restoreUser(String code) {
        Optional<User> optionalUser = userRepository.findById(code);
        User user;

        if(optionalUser.isPresent()) {
            user = optionalUser.get();
            user.setActive(!user.isActive());
            userRepository.save(user);
            return true;
        }
        return false;
    }

    @RequestMapping(value="/secondary")
    @Override
    public User createOrUpdateUser(UserInput userInput) {
        if(userInput.getPw() == null) {
            User user = userRepository.findById(userInput.getCode()).orElse(null);
            if(user != null) {
                mapUser.mapInputToUpdateUser(userInput, user);
                userRepository.save(user);
                return user;
            }
            return null;
        }
        User user = mapUser.mapInputToCreateUser(userInput);
        userRepository.save(user);
        return user;
    }
}
