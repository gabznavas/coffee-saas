package io.github.gabznavas.api.mapper;

import io.github.gabznavas.api.dto.PaymentDto;
import io.github.gabznavas.api.dto.PaymentItemDto;
import io.github.gabznavas.api.dto.PaymentMethodDto;
import io.github.gabznavas.api.entity.Payment;
import org.springframework.stereotype.Component;

@Component
public class PaymentMapper {

    public PaymentDto entityToDTO(Payment payment) {
        return new PaymentDto(
                payment.getId(),
                payment.getCommand().getId(),
                new PaymentMethodDto(payment.getPaymentMethod().getId(), payment.getPaymentMethod().getName()),
                payment.getTotalPrice(),
                payment.getPaymentItems().stream().map(item ->
                        new PaymentItemDto(
                                item.getId(),
                                item.getPrice(),
                                item.getQuantity(),
                                item.getObservations(),
                                item.getCreatedAt(),
                                item.getCanceledAt(),
                                item.getCommandItem().getId()
                        )
                ).toList()
        );
    }
}
