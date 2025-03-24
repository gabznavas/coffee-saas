package io.github.gabznavas.api.mapper;

import io.github.gabznavas.api.dto.UserDTO;
import io.github.gabznavas.api.entity.User;
import org.springframework.stereotype.Component;

@Component
public class UserMapper {

    public UserDTO entityToDTO(User user) {
        return new UserDTO(
                user.getId(),
                user.getFullName(),
                user.getUsername(),
                user.getProfileImageUrl(),
                user.getUserRoles().stream()
                        .map(userRole -> userRole.getRole().getNameType().name())
                        .toList()
        );
    }
}
