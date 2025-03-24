package io.github.gabznavas.api.dto;

import java.time.LocalDateTime;

public record ProductDTO(
        Long id,
        String name,

        String description,
        String categoryName,
        LocalDateTime createdAt,
        LocalDateTime updatedAt,
        LocalDateTime deletedAt
) {
}
