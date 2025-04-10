package io.github.gabznavas.api.mapper;

import io.github.gabznavas.api.dto.PaymentMethodDto;
import io.github.gabznavas.api.entity.PaymentMethod;
import org.springframework.stereotype.Component;

@Component
public class PaymentMethodMapper {

    public PaymentMethodDto entityToDTO(PaymentMethod paymentMethod) {
        return new PaymentMethodDto(
                paymentMethod.getId(),
                paymentMethod.getName()
        );
    }
}
