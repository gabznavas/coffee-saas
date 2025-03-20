package io.github.gabznavas.api.service;

import io.github.gabznavas.api.dto.RegisterDTO;
import io.github.gabznavas.api.dto.UserDTO;
import io.github.gabznavas.api.entity.Role;
import io.github.gabznavas.api.entity.RoleNameType;
import io.github.gabznavas.api.entity.User;
import io.github.gabznavas.api.entity.UserRole;
import io.github.gabznavas.api.mapper.UserMapper;
import io.github.gabznavas.api.repository.RoleRepository;
import io.github.gabznavas.api.repository.UserRepository;
import io.github.gabznavas.api.repository.UserRoleRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
public class RegisterService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private UserRoleRepository userRoleRepository;

    @Autowired
    private RoleRepository roleRepository;

    @Autowired
    private UserMapper userMapper;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Transactional
    public UserDTO register(RegisterDTO dto) {
        if (!dto.password().equals(dto.passwordConfirmation())) {
            throw new RuntimeException("password and password confirmation is not equals.");
        }

        User userByEmail = userRepository.findByEmail(dto.email())
                .orElseThrow(() -> new RuntimeException("User already exists with email."));

        final User user = new User();
        user.setFullName(dto.fullName());
        user.setUsername(dto.email());
        user.setPassword(passwordEncoder.encode(dto.password()));
        user.setCreatedAt(LocalDateTime.now());
        user.setDisabledAt(null);

        userRepository.save(user);

        final Role role = roleRepository.findByNameType(RoleNameType.ATTENDANT)
                .orElseThrow(() -> new RuntimeException("role not found"));

        final UserRole userRole = new UserRole();
        userRole.setUser(user);
        userRole.setRole(role);
        userRole.setUserRoleId(new UserRole.UserRoleId(user.getId(), role.getId()));
        user.getUserRoles().add(userRole);

        userRoleRepository.save(user.getUserRoles().get(0));

        return userMapper.entityToDTO(user);
    }
}
