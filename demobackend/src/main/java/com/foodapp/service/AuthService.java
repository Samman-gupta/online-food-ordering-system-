package com.foodapp.service;

import com.foodapp.dto.AuthRequest;
import com.foodapp.dto.AuthResponse;
import com.foodapp.model.AppUser;
import com.foodapp.repository.AppUserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final AppUserRepository appUserRepository;
    private final PasswordEncoder passwordEncoder;

    public AuthResponse register(AuthRequest request) {
        if (isBlank(request.getName()) || isBlank(request.getUsername()) || isBlank(request.getPassword())) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Name, username and password are required");
        }

        String normalizedUsername = request.getUsername().trim();
        if (appUserRepository.existsByUsername(normalizedUsername)) {
            throw new ResponseStatusException(HttpStatus.CONFLICT, "Username already exists");
        }

        AppUser user = new AppUser();
        user.setName(request.getName().trim());
        user.setUsername(normalizedUsername);
        user.setPassword(passwordEncoder.encode(request.getPassword()));

        AppUser savedUser = appUserRepository.save(user);
        return toResponse(savedUser, "Account created");
    }

    public AuthResponse getCurrentUser() {
        return toResponse(getAuthenticatedUser(), "Authenticated");
    }

    public AppUser getAuthenticatedUser() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication == null || authentication.getName() == null) {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Authentication required");
        }

        return appUserRepository.findByUsername(authentication.getName())
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.UNAUTHORIZED, "User not found"));
    }

    private AuthResponse toResponse(AppUser user, String message) {
        return new AuthResponse(user.getId(), user.getName(), user.getUsername(), message);
    }

    private boolean isBlank(String value) {
        return value == null || value.trim().isEmpty();
    }
}
