package com.adwProject.Backend.secondary.resolver;

import com.adwProject.Backend.secondary.dto.UserInput;
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

}
