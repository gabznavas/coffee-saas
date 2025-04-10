package io.github.gabznavas.api.dto;

import java.util.List;

public record PaymentDto(
        Long id,
        Long commandId,
        PaymentMethodDto paymentMethod,
        Double totalPrice,
        List<PaymentItemDto> paymentItems
) {
}
