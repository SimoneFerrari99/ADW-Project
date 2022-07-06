package com.adwProject.Backend.secondary.resolver;

import com.adwProject.Backend.secondary.dto.UserInput;
import com.adwProject.Backend.secondary.entity.User;
import com.adwProject.Backend.secondary.service.user.UserService;
import graphql.kickstart.tools.GraphQLMutationResolver;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Component;

@Component
@AllArgsConstructor
public class UserMutationResolver implements GraphQLMutationResolver {                                                  //The resolver, in this case GraphQLMutationResolver, is the penultimate step in executing the Mutation

    private final UserService userService;

    public Boolean updatePsw(String code, String password) {                                                            //Method used for update a password of an existing User
        return userService.updatePassword(code, password);
    }
    public Boolean restoreUser(String code) {                                                                           //Method used for restore a disabled User
        return userService.restoreUser(code);
    }
    public User createUser(UserInput userInput) {                                                                       //Method used for create a new User
        return userService.createUser(userInput);
    }

    public User updateUser(UserInput userInput, String code) {                                                          //Method used for update an existing User
        return userService.updateUser(userInput, code);
    }

}
