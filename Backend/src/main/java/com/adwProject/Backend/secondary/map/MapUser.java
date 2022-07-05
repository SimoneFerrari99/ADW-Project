package com.adwProject.Backend.secondary.map;

import com.adwProject.Backend.secondary.dto.UserInput;
import com.adwProject.Backend.secondary.entity.User;
import com.adwProject.Backend.utility.Utility;
import org.springframework.stereotype.Component;

@Component
public class MapUser {
    public User mapInputToCreateUser(UserInput userInput) {
        User user = new User();

        user.setCode(userInput.getCode());
        user.setTypology(userInput.getTypology());
        user.setActive(userInput.isActive());
        user.setEmail(userInput.getEmail());
        user.setPw(Utility.hashPassword(userInput.getPw()));

        return user;
    }

    public User mapInputToUpdateUser(UserInput userInput, User user) {

        user.setTypology(userInput.getTypology());
        user.setActive(userInput.isActive());
        user.setEmail(userInput.getEmail());

        return user;
    }
}
