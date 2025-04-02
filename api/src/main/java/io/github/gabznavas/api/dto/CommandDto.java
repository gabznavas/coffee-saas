package io.github.gabznavas.api.dto;

import jakarta.validation.constraints.NotNull;

import java.time.LocalDateTime;

public record CommandDto(
        Long id,

        @NotNull(message = "customer name missing. may be empty")
        String clientName,

        DiningTableDTO diningTable,

        Double priceTotal,

        @NotNull(message = "missing attendent id")
        Long attendentId,

        LocalDateTime openedAt,
        LocalDateTime canceledIn,
        LocalDateTime closedAt
) {
}
