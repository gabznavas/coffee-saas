package io.github.gabznavas.api.dto;

import jakarta.validation.constraints.*;

import java.util.List;

public record UpdateUserDTO(
        @NotBlank
        @Size(min = 2, max = 100, message = "minimum 2 characters and maximum 100 characters")
        String fullName,
        @NotBlank
        @Email(message = "email wrong")
        String email,

        @NotNull(message = "missing role ids array")
        @NotEmpty(message = "At least one role is required")
        List<Long> roleIds
) {
}
