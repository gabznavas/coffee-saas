package io.github.gabznavas.api.controller;

import io.github.gabznavas.api.entity.Role;
import io.github.gabznavas.api.entity.RoleType;
import io.github.gabznavas.api.entity.User;
import io.github.gabznavas.api.entity.UserRole;
import io.github.gabznavas.api.repository.RoleRepository;
import io.github.gabznavas.api.repository.UserRepository;
import io.github.gabznavas.api.repository.UserRoleRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.time.LocalDateTime;
import java.util.Random;

@RestController
@RequestMapping("/user")
public class UserController {

    @Autowired
    private UserRoleRepository userRoleRepository;

    @Autowired
    private RoleRepository roleRepository;

    @Autowired
    private UserRepository userRepository;

    @PostMapping
    @Transactional
    public ResponseEntity<?> createUser() {
        final Role role = roleRepository.findByRole(RoleType.ATTENDANT)
                .orElseThrow(() -> new RuntimeException("role not found"));

        int id = new Random().nextInt();

        final User user = new User();
        user.setFullName("Gabriel Navas");
        user.setEmail("navas" + id + "@email.com");
        user.setPassword("12345678");
        user.setCreatedAt(LocalDateTime.now());

        userRepository.save(user);

        final UserRole userRole = new UserRole();
        userRole.setUser(user);
        userRole.setRole(role);
        userRole.setUserRoleId(new UserRole.UserRoleId(user.getId(), role.getId()));
        userRoleRepository.save(userRole);

        user.getUserRoles().add(userRole);

        final User userFound = userRepository.findById(user.getId())
                .orElseThrow(() -> new RuntimeException("user not found?"));

        userFound.getUserRoles().stream().forEach(item -> {
            System.out.println(item.getRole().getRole().name());
        });

        return ResponseEntity.status(HttpStatus.CREATED).body(userFound);
    }
}
