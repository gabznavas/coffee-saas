package io.github.gabznavas.api.dto;

import java.time.LocalDateTime;

public record TableDTO(
        Long id,
        String name,
        Boolean busy,
        LocalDateTime createdAt,
        LocalDateTime updatedAt
) {
}
