package io.github.gabznavas.api.repository;


import io.github.gabznavas.api.entity.Payment;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PaymentRepository extends JpaRepository<Payment, Long> {
}
