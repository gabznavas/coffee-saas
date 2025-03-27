package io.github.gabznavas.api.service;

import io.github.gabznavas.api.dto.*;
import io.github.gabznavas.api.entity.Role;
import io.github.gabznavas.api.entity.RoleNameType;
import io.github.gabznavas.api.entity.User;
import io.github.gabznavas.api.entity.UserRole;
import io.github.gabznavas.api.exception.*;
import io.github.gabznavas.api.mapper.UserMapper;
import io.github.gabznavas.api.repository.RoleRepository;
import io.github.gabznavas.api.repository.UserRepository;
import io.github.gabznavas.api.repository.UserRoleRepository;
import jakarta.transaction.Transactional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class UserService {


    private static final Logger log = LoggerFactory.getLogger(UserService.class);
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
    public UserDTO registerUser(RegisterUserDTO dto) {
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

        final List<UserRole> userRoles = dto.roleIds().stream().map(roleId -> {
            final Role role = roleRepository.findById(roleId)
                    .orElseThrow(() -> new RoleNotFoundByException("name"));
            final UserRole userRole = new UserRole();
            userRole.setUser(user);
            userRole.setRole(role);
            userRole.setUserRoleId(new UserRole.UserRoleId(user.getId(), role.getId()));
            return userRole;
        }).toList();

        user.getUserRoles().addAll(userRoles);
        userRoleRepository.saveAll(user.getUserRoles());

        return userMapper.entityToDTO(user);
    }


    @Transactional
    public void updateUser(Long userId, UpdateUserDTO dto) {
        // Verifica se o e-mail já está em uso
        final Optional<User> optionalUserByEmail = userRepository.findByEmail(dto.email());
        if (optionalUserByEmail.isPresent() && !optionalUserByEmail.get().getId().equals(userId)) {
            throw new UserAlreadyExistsWithException("email");
        }

        // Busca o usuário pelo ID
        final User user = userRepository.findById(userId)
                .orElseThrow(() -> new UserNotFoundByException("id"));

        // Atualiza os dados do usuário
        user.setFullName(dto.fullName());
        user.setEmail(dto.email());
        user.setUpdatedAt(LocalDateTime.now());
        userRepository.saveAndFlush(user);


        // remover e adicionar
        final List<Long> addUserRoles = new ArrayList<>();
        final List<UserRole> removeUserRoles = new ArrayList<>();

        // Quais o usuário precisa remover
        for (UserRole userRole : user.getUserRoles()) {
            boolean has = false;
            for (Long userRoleId : dto.roleIds()) {
                if (userRole.getRole().getId().equals(userRoleId)) {
                    has = true;
                    break;
                }
            }
            if (!has) {
                removeUserRoles.add(userRole);
            }
        }

        // Quais o usuário precisa adicionar
        for (Long userRoleId : dto.roleIds()) {
            boolean has = false;
            for (UserRole userRole : user.getUserRoles()) {
                if (userRoleId.equals(userRole.getRole().getId())) {
                    has = true;
                    break;
                }
            }
            if (!has) {
                addUserRoles.add(userRoleId);
            }
        }

        // remover os escolhidos
        for (UserRole userRole : removeUserRoles) {
            userRoleRepository.deleteByUserIdAndRoleId(userRole.getUser().getId(), userRole.getRole().getId());
        }

        // adicionar os escolhidos
        for (Long roleId : addUserRoles) {
            final Role role = roleRepository.findById(roleId)
                    .orElseThrow(() -> new RoleNotFoundByException("id"));
            userRoleRepository.save(new UserRole(user, role));
        }
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

        for (UserRole userRole : user.getUserRoles()) {
            userRoleRepository.save(userRole);
        }
    }

    @Transactional
    public void updateProfile(Long userId, ProfileDTO dto) {
        final User userToUpdate = userRepository.findById(userId)
                .orElseThrow(() -> new UserNotFoundByException("id"));

        userToUpdate.setFullName(dto.fullName());
        userToUpdate.setProfileImageUrl(dto.profileImageUrl());
        userToUpdate.setUpdatedAt(LocalDateTime.now());

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
        userToUpdate.setUpdatedAt(LocalDateTime.now());

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
        final User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new UserNotFoundByException("e-mail"));
        return userMapper.entityToDTO(user);
    }

    public UserDTO findUserById(Long userId) {
        final User user = userRepository.findById(userId)
                .orElseThrow(() -> new UserNotFoundByException("e-mail"));
        return userMapper.entityToDTO(user);
    }

    @Transactional()
    public void deleteUser(Long userId) {
        final User user = userRepository.findById(userId)
                .orElseThrow(() -> new UserNotFoundByException("id"));

        final Long countAdminUsers = userRepository.countUsersByRole(RoleNameType.ADMIN);
        final boolean uniqueAdmin = countAdminUsers == 1;
        if (uniqueAdmin) {
            throw new UniqueUserAdminException();
        }

        for (UserRole userRole : user.getUserRoles()) {
            userRoleRepository.findById(new UserRole.UserRoleId(userRole.getUser().getId(), userRole.getRole().getId()))
                    .orElseThrow(UserRoleNotFoundException::new);
            userRoleRepository.deleteByUserIdAndRoleId(userRole.getUser().getId(), userRole.getRole().getId());
        }
        userRepository.deleteById(user.getId());
    }
}
