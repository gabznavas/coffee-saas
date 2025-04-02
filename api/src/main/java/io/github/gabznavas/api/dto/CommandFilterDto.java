package io.github.gabznavas.api.dto;


import org.springframework.data.domain.Pageable;

import java.time.Instant;

public record CommandFilterDto(
        String query,
        CommandState state,
        Instant minDate,
        Instant maxDate,
        Double minPrice,
        Double maxPrice,
        Pageable page
) {
    public enum CommandState {
        OPENED,
        CLOSE,
        CANCELED
    }
}
