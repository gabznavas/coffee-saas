package io.github.gabznavas.api.controller;

import io.github.gabznavas.api.dto.UserDTO;
import io.github.gabznavas.api.entity.User;
import io.github.gabznavas.api.mapper.UserMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/user/logged")
public class UserController {

    @Autowired
    private UserMapper userMapper;

    @GetMapping
    public ResponseEntity<UserDTO> getUserLogged(@AuthenticationPrincipal UserDetails user) {
        final UserDTO dto = this.userMapper.entityToDTO((User) user);
        return ResponseEntity.ok(dto);
    }
}
