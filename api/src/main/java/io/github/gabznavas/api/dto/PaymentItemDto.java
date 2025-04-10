package io.github.gabznavas.api.dto;

import java.time.Instant;

public record PaymentItemDto(
        Long id,
        Double price,
        Long quantity,
        String observations,
        Instant createdAt,
        Instant canceledIn,
        Long commandItemId
) {
}
