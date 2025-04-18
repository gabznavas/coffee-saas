package io.github.gabznavas.api.service;

import io.github.gabznavas.api.dto.LoginDTO;
import io.github.gabznavas.api.entity.User;
import io.github.gabznavas.api.exception.LoginIncorrectException;
import io.github.gabznavas.api.infra.security.TokenService;
import io.github.gabznavas.api.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class LoginService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private TokenService tokenService;

    @Autowired
    private PasswordEncoder passwordEncoder;

    public String login(LoginDTO dto) {
        final User user = userRepository.findByEmail(dto.email())
                .orElseThrow(LoginIncorrectException::new);
        final boolean matchPasswords = passwordEncoder.matches(dto.password(), user.getPassword());
        if (!matchPasswords) {
            throw new LoginIncorrectException();
        }

        final String token = tokenService.generateToken(user);
        return token;
    }
}
