package com.adwProject.Backend.secondary.map;

import com.adwProject.Backend.secondary.dto.UserInput;
import com.adwProject.Backend.secondary.entity.User;
import org.springframework.stereotype.Component;

@Component
public class MapUser {
    public User mapInputToUser(UserInput userInput) {
        User user = new User();

        user.setTypology(userInput.getTypology());
        user.setActive(userInput.isActive());
        user.setEmail(userInput.getEmail());
        user.setPw(userInput.getPw());

        return user;
    }
}
