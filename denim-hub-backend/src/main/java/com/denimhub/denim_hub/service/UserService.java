package com.denimhub.denim_hub.service;

import com.denimhub.denim_hub.entity.Users;

public interface UserService {

    boolean login(String username, String password);

    void changePassword(String username, String oldPassword, String newPassword);

    Users findByUsername(String username);
}