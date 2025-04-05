package io.github.gabznavas.api.dto;

import jakarta.validation.constraints.*;

public record CreateCommandItemDto(
        @NotNull(message = "missing product id")
        Long productId,
        @NotNull(message = "quantity is required")
        @Min(value = 1, message = "the quantity must be at least 1")
        @Max(value = 10_000, message = "quantity must up to 10000")
        Long quantity,
        @NotNull(message = "price is required")
        @DecimalMin(value = "0.01", message = "the price must be at least 0.01")
        @DecimalMax(value = "10000", message = "the price must be up to 10,000")
        Double price,


        @NotNull(message = "missing observation")
        @Size(max = 255, message = "observation must have a maximum of 255")
        String observations
) {
}
