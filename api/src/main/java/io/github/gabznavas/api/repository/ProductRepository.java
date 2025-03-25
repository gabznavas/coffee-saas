package io.github.gabznavas.api.repository;

import io.github.gabznavas.api.entity.Product;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface ProductRepository extends JpaRepository<Product, Long> {

    Optional<Product> findFirstByNameAndDeletedAtIsNull(String name);

    List<Product> findAllByDeletedAtIsNull();
}
