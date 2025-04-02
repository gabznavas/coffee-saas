package io.github.gabznavas.api.dto;

import jakarta.validation.constraints.NotNull;

import java.time.Instant;

public record CommandDto(
        Long id,

        @NotNull(message = "customer name missing. may be empty")
        String clientName,

        DiningTableDTO diningTable,

        Double priceTotal,

        @NotNull(message = "missing attendent id")
        Long attendentId,

        Instant openedAt,
        Instant canceledIn,
        Instant closedAt
) {
}
