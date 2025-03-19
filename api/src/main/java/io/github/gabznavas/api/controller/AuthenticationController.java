package io.github.gabznavas.api.controller;

import io.github.gabznavas.api.dto.LoginDTO;
import io.github.gabznavas.api.dto.RegisterDTO;
import io.github.gabznavas.api.service.LoginService;
import io.github.gabznavas.api.service.RegisterService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/auth")
public class AuthenticationController {

    @Autowired
    private LoginService loginService;

    @Autowired
    private RegisterService registerService;


    @PostMapping("/login")
    public ResponseEntity<String> login(@RequestBody @Valid LoginDTO dto) {
        final String token = loginService.login(dto);
        return ResponseEntity.status(HttpStatus.OK).body(token);
    }

    @PostMapping("/register")
    public ResponseEntity<String> register(@RequestBody @Valid RegisterDTO dto) {
        registerService.register(dto);
        final String token = loginService.login(new LoginDTO(dto.email(), dto.password()));
        return ResponseEntity.status(HttpStatus.CREATED).body(token);
    }
}
