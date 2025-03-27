package io.github.gabznavas.api.service;

import io.github.gabznavas.api.dto.*;
import io.github.gabznavas.api.entity.Role;
import io.github.gabznavas.api.entity.RoleNameType;
import io.github.gabznavas.api.entity.User;
import io.github.gabznavas.api.entity.UserRole;
import io.github.gabznavas.api.exception.PasswordAndPasswordConfirmationDoesNotEqual;
import io.github.gabznavas.api.exception.RoleNotFoundByException;
import io.github.gabznavas.api.exception.UserAlreadyExistsWithException;
import io.github.gabznavas.api.exception.UserNotFoundByException;
import io.github.gabznavas.api.mapper.UserMapper;
import io.github.gabznavas.api.repository.RoleRepository;
import io.github.gabznavas.api.repository.UserRepository;
import io.github.gabznavas.api.repository.UserRoleRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UserService {


    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private UserRoleRepository userRoleRepository;

    @Autowired
    private RoleRepository roleRepository;

    @Autowired
    private UserMapper userMapper;


    @Transactional
    public UserDTO registerUser(RegisterDTO dto) {
        if (!dto.password().equals(dto.passwordConfirmation())) {
            throw new PasswordAndPasswordConfirmationDoesNotEqual();
        }

        final Optional<User> optionalUserByEmail = userRepository.findByEmail(dto.email());
        if (optionalUserByEmail.isPresent()) {
            throw new UserAlreadyExistsWithException("email");
        }

        final User user = new User();
        user.setFullName(dto.fullName());
        user.setEmail(dto.email());
        user.setPassword(passwordEncoder.encode(dto.password()));

        userRepository.save(user);

        final Role role = roleRepository.findByNameType(RoleNameType.ATTENDANT)
                .orElseThrow(() -> new RoleNotFoundByException("name"));

        final UserRole userRole = new UserRole();
        userRole.setUser(user);
        userRole.setRole(role);
        userRole.setUserRoleId(new UserRole.UserRoleId(user.getId(), role.getId()));

        user.getUserRoles().add(userRole);
        userRoleRepository.save(user.getUserRoles().get(0));

        return userMapper.entityToDTO(user);
    }

    @Transactional
    public void registerAdmin() {
        final User user = new User();
        user.setFullName("admin");
        user.setEmail("admin@email.com");
        user.setPassword(passwordEncoder.encode("123123"));

        final Optional<User> optionalUserByEmail = userRepository.findByEmail(user.getEmail());
        if (optionalUserByEmail.isPresent()) {
            throw new UserAlreadyExistsWithException("email");
        }

        userRepository.save(user);

        final Role roleAttendant = roleRepository.findByNameType(RoleNameType.ATTENDANT)
                .orElseThrow(() -> new RoleNotFoundByException("name"));
        final Role roleCashier = roleRepository.findByNameType(RoleNameType.CASHIER)
                .orElseThrow(() -> new RoleNotFoundByException("name"));
        final Role roleManager = roleRepository.findByNameType(RoleNameType.MANAGER)
                .orElseThrow(() -> new RoleNotFoundByException("name"));
        final Role roleAdmin = roleRepository.findByNameType(RoleNameType.ADMIN)
                .orElseThrow(() -> new RoleNotFoundByException("name"));

        user.getUserRoles().add(new UserRole(user, roleAttendant));
        user.getUserRoles().add(new UserRole(user, roleCashier));
        user.getUserRoles().add(new UserRole(user, roleManager));
        user.getUserRoles().add(new UserRole(user, roleAdmin));

        user.getUserRoles().forEach(userRoleRepository::save);
    }

    @Transactional
    public void updateProfile(Long userId, ProfileDTO dto) {
        final User userToUpdate = userRepository.findById(userId)
                .orElseThrow(() -> new UserNotFoundByException("id"));

        userToUpdate.setFullName(dto.fullName());
        userToUpdate.setProfileImageUrl(dto.profileImageUrl());

        userRepository.save(userToUpdate);
    }

    @Transactional
    public void updateSecurity(Long id, SecurityDTO dto) {
        final User userToUpdate = userRepository.findById(id)
                .orElseThrow(() -> new UserNotFoundByException("id"));

        final User userByEmail = userRepository.findByEmail(dto.email())
                .orElseThrow(() -> new UserNotFoundByException("email"));

        final boolean userWithEqualsEmail = userByEmail.getEmail().equals(dto.email());
        final boolean byOtherUser = !userByEmail.getId().equals(id);
        if (userWithEqualsEmail && byOtherUser) {
            throw new UserAlreadyExistsWithException("email");
        }

        if (!dto.password().equals(dto.passwordConfirmation())) {
            throw new PasswordAndPasswordConfirmationDoesNotEqual();
        }

        userToUpdate.setEmail(dto.email());
        userToUpdate.setPassword(passwordEncoder.encode(dto.password()));

        userRepository.save(userToUpdate);
    }

    public PaginatedResponse<UserDTO> findAllUsers(String query, Pageable page) {
        final Page<User> paginatedUsers = userRepository.findAllByQuery(
                query,
                page
        );
        final List<UserDTO> userDTOs = paginatedUsers
                .stream()
                .map(userMapper::entityToDTO)
                .toList();

        return new PaginatedResponse<>(
                userDTOs,
                userDTOs.size(),
                paginatedUsers.getTotalPages(),
                page.getPageSize(),
                page.getPageNumber()
        );
    }

    public UserDTO findUserByEmail(String email) {
        final User user = userRepository.findByEmail(email).orElseThrow(() -> new UserNotFoundByException("e-mail"));
        return userMapper.entityToDTO(user);
    }
}
