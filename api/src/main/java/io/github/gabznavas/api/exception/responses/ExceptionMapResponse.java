package io.github.gabznavas.api.exception.responses;

import java.time.LocalDateTime;
import java.util.Map;

public record ExceptionMapResponse(
        LocalDateTime timestamp,
        Map<String, String> messages,
        String details
) {
}
