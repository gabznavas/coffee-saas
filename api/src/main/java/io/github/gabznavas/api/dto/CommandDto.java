package io.github.gabznavas.api.dto;

import jakarta.validation.constraints.NotNull;

import java.time.Instant;

public record CommandDto(
        Long id,

        @NotNull(message = "customer name missing. may be empty")
        String clientName,

        DiningTableDTO diningTable,

        Double priceTotal,

        CommandAttendentDto attendent,

        Instant openedAt,
        Instant canceledIn,
        Instant closedAt
) {

    public record CommandAttendentDto(
            Long id,
            String fullName
    ) {
    }
}
