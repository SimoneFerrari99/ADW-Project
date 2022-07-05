package com.adwProject.Backend.secondary.map;

import com.adwProject.Backend.secondary.dto.UserInput;
import com.adwProject.Backend.secondary.entity.User;
import com.adwProject.Backend.secondary.entity.enums.Typology;
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

    public void mapInputToUpdateUser(UserInput userInput, User user) {
        Typology tp = userInput.getTypology();
        String pw = userInput.getPw();
        if(tp != null) {
            user.setTypology(tp);
        }
        if(pw != null) {
            user.setPw(Utility.hashPassword(pw));
        }

        user.setActive(userInput.isActive());
        user.setEmail(userInput.getEmail());
    }
}
