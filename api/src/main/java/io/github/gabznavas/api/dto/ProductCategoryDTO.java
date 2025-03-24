package io.github.gabznavas.api.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public record ProductCategoryDTO(
        Long id,

        @NotBlank(message = "missing category name")
        @Size(min = 2, max = 50, message = "the name must be at least 10 characters long and 500 characters long")
        String name
) {
}
