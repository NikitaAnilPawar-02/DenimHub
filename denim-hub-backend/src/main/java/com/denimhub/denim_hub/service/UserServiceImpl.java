package com.denimhub.denim_hub.service;

import com.denimhub.denim_hub.entity.Users;
import com.denimhub.denim_hub.repository.UserRepository;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;
    private final BCryptPasswordEncoder encoder;

    public UserServiceImpl(UserRepository userRepository,
                           BCryptPasswordEncoder encoder) {
        this.userRepository = userRepository;
        this.encoder = encoder;
    }

    // LOGIN LOGIC
    @Override
    public boolean login(String username, String password) {

        Users user = userRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("User not found"));

        System.out.println("Entered password: " + password);
        System.out.println("Stored password: " + user.getPassword());

        boolean match = encoder.matches(password, user.getPassword());

        System.out.println("Password match result: " + match);

        return match;
    }

    // CHANGE PASSWORD LOGIC
    @Override
    public void changePassword(String username, String oldPassword, String newPassword) {

        Users user = userRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("User not found"));

        // Verify old password
        if (!encoder.matches(oldPassword, user.getPassword())) {
            throw new RuntimeException("Old password is incorrect");
        }

        // Encode & update new password
        user.setPassword(encoder.encode(newPassword));
        userRepository.save(user);
    }

    @Override
    public Users findByUsername(String username) {
        return userRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("User not found"));
    }

}