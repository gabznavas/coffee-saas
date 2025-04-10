package io.github.gabznavas.api.service;

import io.github.gabznavas.api.dto.PaymentMethodDto;
import io.github.gabznavas.api.mapper.PaymentMethodMapper;
import io.github.gabznavas.api.repository.PaymentMethodRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PaymentMethodService {

    @Autowired
    private PaymentMethodRepository paymentMethodRepository;

    @Autowired
    private PaymentMethodMapper paymentMethodMapper;

    public List<PaymentMethodDto> findAllPaymentMethod() {
        return paymentMethodRepository.findAll(Sort.by(Sort.Direction.ASC, "id"))
                .stream()
                .limit(20)
                .map(item -> paymentMethodMapper.entityToDTO(item))
                .toList();
    }
}
