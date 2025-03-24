package io.github.gabznavas.api.mapper;

import io.github.gabznavas.api.dto.ProductCategoryDTO;
import io.github.gabznavas.api.entity.ProductCategory;
import org.springframework.stereotype.Component;

@Component
public class ProductCategoryMapper {
    public ProductCategoryDTO entityToDTO(ProductCategory item) {
        return new ProductCategoryDTO(
                item.getId(),
                item.getName()
        );
    }

}
