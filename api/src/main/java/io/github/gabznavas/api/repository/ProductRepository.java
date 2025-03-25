package io.github.gabznavas.api.repository;

import io.github.gabznavas.api.entity.Product;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface ProductRepository extends JpaRepository<Product, Long> {

    Optional<Product> findFirstByNameAndDeletedAtIsNull(String name);

    Page<Product> findByNameContainingIgnoreCase(String name, Pageable pageable);
}
