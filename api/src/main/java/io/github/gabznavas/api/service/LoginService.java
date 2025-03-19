package io.github.gabznavas.api.service;

import io.github.gabznavas.api.dto.LoginDTO;
import io.github.gabznavas.api.entity.User;
import io.github.gabznavas.api.repository.UserRepository;
import io.github.gabznavas.api.security.TokenService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class LoginService {

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private TokenService tokenService;

    @Autowired
    private PasswordEncoder passwordEncoder;

    public String login(LoginDTO dto) {
        final User user = (User) userRepository.findByEmail(dto.email());
        if (user == null) {
            throw new RuntimeException("Email or Passwords is incorrect.");
        }
        final boolean matchPasswords = passwordEncoder.matches(dto.password(), user.getPassword());
        if (!matchPasswords) {
            throw new RuntimeException("Email or Passwords is incorrect.");
        }

        final String token = tokenService.generateToken(user);
        return token;
    }
}
