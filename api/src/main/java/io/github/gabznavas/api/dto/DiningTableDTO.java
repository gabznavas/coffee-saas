package io.github.gabznavas.api.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

import java.time.LocalDateTime;

public record DiningTableDTO(
        Long id,

        @NotBlank(message = "Missing name.")
        @Size(min = 1, max = 50, message = "the name must be at least 2 characters long and 45 characters long")
        String name,

        Boolean busy,
        LocalDateTime createdAt,
        LocalDateTime updatedAt
) {
}
