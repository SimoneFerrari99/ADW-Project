package com.adwProject.Backend.secondary.resolver;

import com.adwProject.Backend.secondary.entity.User;
import com.adwProject.Backend.secondary.service.user.UserService;
import graphql.kickstart.tools.GraphQLQueryResolver;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;

@Component
@Slf4j
@AllArgsConstructor
public class UserQueryResolver implements GraphQLQueryResolver {
    private final UserService userService;

    public User userById(String code) {
        return userService.getById(code);
    }

    public User userAuth(String email, String password) {
        return userService.userAuth(email, password);
    }
}
