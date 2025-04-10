package io.github.gabznavas.api.dto;

public record CreatePaymentDto(
        Long paymentMethodId,
        Long commandId,
        Long cashierId
) {
}
