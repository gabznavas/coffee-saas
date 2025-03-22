package io.github.gabznavas.api.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public record ProfileDTO(
        @NotBlank
        @Size(min = 2, max = 100, message = "minimum 2 characters and maximum 100 characters")
        String fullName,

        @NotBlank
        @Size(min = 2, max = 500, message = "minimum 2 characters and maximum 500 characters")
        String profileImageUrl
) {
}
