package com.adwProject.Backend.secondary.service.user;

import com.adwProject.Backend.secondary.entity.User;

public interface UserService {

    User getById(String id);
    User getByEmail(String email);
}
