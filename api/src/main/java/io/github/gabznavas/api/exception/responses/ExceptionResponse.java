package io.github.gabznavas.api.exception.responses;

import java.time.LocalDateTime;

public record ExceptionResponse(
        LocalDateTime timestamp,
        String message,
        String details
) {
}
