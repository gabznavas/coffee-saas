package io.github.gabznavas.api.dto;


import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public record UnitDTO(
        Long id,

        @NotBlank(message = "Missing name.")
        @Size(min = 1, max = 50, message = "the description must be at least 1 characters long and 50 characters long")
        String name,
        @NotBlank(message = "Missing name.")
        @Size(min = 1, max = 10, message = "the acronym must be at least 1 characters long and 10 characters long")
        String acronym
) {
}
