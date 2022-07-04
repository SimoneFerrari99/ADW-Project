package com.adwProject.Backend.secondary.service.user;

import com.adwProject.Backend.secondary.dto.UserInput;
import com.adwProject.Backend.secondary.entity.User;

public interface UserService {

    User getById(String code);
    User userAuth(String email, String password);
    Boolean updatePassword(String code, String password);
    Boolean toggleActive(String code);
    User createUser(UserInput userInput);
}
