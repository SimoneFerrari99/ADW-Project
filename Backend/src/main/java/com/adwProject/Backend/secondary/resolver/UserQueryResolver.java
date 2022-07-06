package com.adwProject.Backend.secondary.resolver;

import com.adwProject.Backend.secondary.entity.User;
import com.adwProject.Backend.secondary.service.user.UserService;
import graphql.kickstart.tools.GraphQLQueryResolver;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Component;

@Component
@AllArgsConstructor
public class UserQueryResolver implements GraphQLQueryResolver {                                                        //The resolver, in this case GraphQLQueryResolver, is the penultimate step in executing the Query
    private final UserService userService;

    public User userById(String code) {                                                                                 //Method used for search a User by Id ("code")
        return userService.getById(code);
    }

    public User userAuth(String email, String password) {                                                               //Method used for authenticate a User using "email" and "password"
        return userService.userAuth(email, password);
    }
}
