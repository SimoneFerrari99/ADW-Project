package com.adwProject.Backend.secondary.resolver;

import com.adwProject.Backend.secondary.dto.UserInput;
import com.adwProject.Backend.secondary.entity.User;
import com.adwProject.Backend.secondary.service.user.UserService;
import graphql.kickstart.tools.GraphQLMutationResolver;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Component;

@Component
@AllArgsConstructor
public class UserMutationResolver implements GraphQLMutationResolver {

    private final UserService userService;

    public Boolean updatePsw(String code, String password) {
        return userService.updatePassword(code, password);
    }
    public Boolean restoreUser(String code) {
        return userService.restoreUser(code);
    }
    public User createUser(UserInput userInput) {
        return userService.createUser(userInput);
    }

    public User updateUser(UserInput userInput, String code) {
        return userService.updateUser(userInput, code);
    }

}
