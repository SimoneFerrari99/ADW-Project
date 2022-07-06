package com.adwProject.Backend.secondary.service.user;

import com.adwProject.Backend.secondary.dto.UserInput;
import com.adwProject.Backend.secondary.entity.User;

public interface UserService {          //The "UserService" interface contains a collection of methods that will be implemented in the "UserServiceImpl" class

    User getById(String code);
    User userAuth(String email, String password);
    Boolean updatePassword(String code, String password);
    Boolean restoreUser(String code);
    User createUser(UserInput userInput);
    User updateUser(UserInput userInput, String code);

}
