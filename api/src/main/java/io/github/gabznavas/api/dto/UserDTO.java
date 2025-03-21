package io.github.gabznavas.api.dto;

public record UserDTO(
        Long id,
        String fullName,
        String email,
        String profileImageUrl
) {
}
