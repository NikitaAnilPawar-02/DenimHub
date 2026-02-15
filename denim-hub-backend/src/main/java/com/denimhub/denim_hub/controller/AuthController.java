package com.denimhub.denim_hub.controller;

import com.denimhub.denim_hub.DTO.LoginRequest;
import com.denimhub.denim_hub.DTO.LoginResponse;
import com.denimhub.denim_hub.entity.Users;
import com.denimhub.denim_hub.service.UserService;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final UserService userService;

    public AuthController(UserService userService) {
        this.userService = userService;
    }

    // LOGIN API
    @PostMapping("/login")
    public LoginResponse login(@RequestBody LoginRequest request) {

        boolean success = userService.login(
                request.getUsername(),
                request.getPassword()
        );

        if (success) {
            Users user = userService.findByUsername(request.getUsername());

            return new LoginResponse(
                    "Login successful",
                    user.getRole()
            );
        } else {
            return new LoginResponse(
                    "Invalid credentials",
                    null
            );
        }
    }
    // CHANGE PASSWORD API
    @PostMapping("/change-password")
    public String changePassword(@RequestParam String username,
                                 @RequestParam String oldPassword,
                                 @RequestParam String newPassword) {

        userService.changePassword(username, oldPassword, newPassword);
        return "✅ Password changed successfully";
    }
}