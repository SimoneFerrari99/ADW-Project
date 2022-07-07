package com.adwProject.Backend.secondary.map;

import com.adwProject.Backend.secondary.dto.UserInput;
import com.adwProject.Backend.secondary.entity.User;
import com.adwProject.Backend.utility.Utility;
import org.springframework.stereotype.Component;

@Component
public class MapUser {                                                              //This class is used for mutations. It helps us map incoming data from the frontend (UserInput) to the User
    public User mapInputToCreateUser(UserInput userInput) {                                 //Method used for map incoming data to the new User
        User user = new User();

        user.setCode(userInput.getCode());
        user.setTypology(userInput.getTypology());
        user.setActive(userInput.isActive());
        user.setEmail(userInput.getEmail());
        user.setPw(Utility.hashPassword(userInput.getPw()));

        return user;
    }
    public void mapInputToUpdatePasswordUser(UserInput userInput, User user) {              //Method used for map incoming data to update data in User
        user.setPw(Utility.hashPassword(userInput.getPw()));
        user.setActive(userInput.isActive());
        user.setEmail(userInput.getEmail());
    }

    public void mapInputToUpdateTypologyUser(UserInput userInput, User user) {              //Method used for map incoming data to update data in User
        user.setTypology(userInput.getTypology());
        user.setActive(userInput.isActive());
        user.setEmail(userInput.getEmail());
    }

    public void mapInputToUpdateUser(UserInput userInput, User user) {                      //Method used for map incoming data to update data in User
        user.setActive(userInput.isActive());
        user.setEmail(userInput.getEmail());
    }
}
