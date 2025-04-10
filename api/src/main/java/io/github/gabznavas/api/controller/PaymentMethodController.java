package io.github.gabznavas.api.controller;

import io.github.gabznavas.api.dto.PaymentMethodDto;
import io.github.gabznavas.api.service.PaymentMethodService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/v1/payment-method")
public class PaymentMethodController {

    @Autowired
    private PaymentMethodService paymentMethodService;

    @GetMapping
    public ResponseEntity<List<PaymentMethodDto>> findAllPaymentMethod() {
        return ResponseEntity.ok(paymentMethodService.findAllPaymentMethod());
    }
}
