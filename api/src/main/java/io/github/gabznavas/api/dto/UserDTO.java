package io.github.gabznavas.api.dto;

import java.util.List;

public record UserDTO(
        Long id,
        String fullName,
        String email,
        String profileImageUrl,
        List<String> roles,

        // TODO: adicionar createdat, updatedat, deletedat
) {
}
