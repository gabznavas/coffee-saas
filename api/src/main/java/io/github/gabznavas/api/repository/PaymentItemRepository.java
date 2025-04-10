package io.github.gabznavas.api.repository;

import io.github.gabznavas.api.entity.PaymentItem;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PaymentItemRepository extends JpaRepository<PaymentItem, Long> {
}
