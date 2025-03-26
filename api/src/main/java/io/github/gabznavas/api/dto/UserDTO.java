package io.github.gabznavas.api.dto;

import java.time.LocalDateTime;
import java.util.List;

public record UserDTO(
        Long id,
        String fullName,
        String email,
        String profileImageUrl,
        LocalDateTime createdAt,
        LocalDateTime updatedAt,
        LocalDateTime disabledAt,
        LocalDateTime deletedAt,
        List<String> roles
) {
}
