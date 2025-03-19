package io.github.gabznavas.api.service;

import io.github.gabznavas.api.dto.LoginDTO;
import org.springframework.stereotype.Service;

@Service
public class LoginService {

    public String login(LoginDTO dto) {
        String token = "token123";
        return token;
    }
}
