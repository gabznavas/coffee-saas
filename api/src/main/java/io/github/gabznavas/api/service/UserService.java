package io.github.gabznavas.api.service;

import io.github.gabznavas.api.dto.ProfileDTO;
import io.github.gabznavas.api.dto.SecurityDTO;
import io.github.gabznavas.api.entity.User;
import io.github.gabznavas.api.exception.PasswordAndPasswordConfirmationDoesNotEqual;
import io.github.gabznavas.api.exception.UserAlreadyExistsWithException;
import io.github.gabznavas.api.exception.UserNotFoundByException;
import io.github.gabznavas.api.repository.UserRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class UserService {


    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private UserRepository userRepository;


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
}
