package io.github.gabznavas.api.dto;

import jakarta.validation.constraints.*;

import java.time.LocalDateTime;

public record ProductDTO(
        Long id,

        @NotBlank(message = "name is not valid")
        String name,

        @NotBlank(message = "description is not valid")
        @Size(min = 10, max = 500, message = "the description must be at least 10 characters long and 500 characters long")
        String description,

        @NotNull
        @Min(value = 1, message = "the stock must be at least 1")
        @Max(value = 10_000, message = "stock must up to 10000")
        String stock,

        @NotNull(message = "missing unit id")
        Long unitId,

        @NotNull(message = "missing category id")
        Long categoryId,
        LocalDateTime createdAt,
        LocalDateTime updatedAt,
        LocalDateTime deletedAt
) {
}
