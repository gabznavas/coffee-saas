package io.github.gabznavas.api.dto;


import org.springframework.data.domain.Pageable;

import java.time.LocalDateTime;

public record CommandFilterDto(
        String query,
        CommandState state,
        LocalDateTime minDate,
        LocalDateTime maxDate,
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
