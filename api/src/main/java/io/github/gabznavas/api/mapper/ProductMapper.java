package io.github.gabznavas.api.mapper;

import io.github.gabznavas.api.dto.ProductDTO;
import io.github.gabznavas.api.entity.Product;
import org.springframework.stereotype.Component;

@Component
public class ProductMapper {


    public ProductDTO entityToDTO(Product product) {
        return new ProductDTO(
                product.getId(),
                product.getName(),
                product.getDescription(),
                product.getProductCategory().getName(),
                product.getCreatedAt(),
                product.getUpdatedAt(),
                product.getDeletedAt()
        );
    }
}
