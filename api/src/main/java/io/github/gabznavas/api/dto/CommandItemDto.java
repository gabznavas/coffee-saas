package io.github.gabznavas.api.dto;

import java.time.Instant;

public record CommandItemDto(
        Long id,
        Long commandId,
        Long quantity,
        Double price,
        String observations,
        Instant createdAt,
        Instant canceledIn,
        CommandItemDto.Product product
) {

    public record Product(
            Long id,
            String name,
            Double price
    ) {

    }
}
