package io.github.gabznavas.api.service;

import io.github.gabznavas.api.dto.ProfileDTO;
import io.github.gabznavas.api.entity.User;
import io.github.gabznavas.api.exception.UserNotFoundByException;
import io.github.gabznavas.api.repository.UserRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;


    @Transactional
    public void updateProfile(Long userId, ProfileDTO dto) {
        final User user = userRepository.findById(userId)
                .orElseThrow(() -> new UserNotFoundByException("id"));

        user.setFullName(dto.fullName());
        user.setProfileImageUrl(dto.profileImageUrl());

        userRepository.save(user);
    }
}
