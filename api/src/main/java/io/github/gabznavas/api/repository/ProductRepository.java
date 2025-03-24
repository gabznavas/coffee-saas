package io.github.gabznavas.api.repository;

import io.github.gabznavas.api.entity.Product;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProductRepository extends JpaRepository<Product, Long> {
}
