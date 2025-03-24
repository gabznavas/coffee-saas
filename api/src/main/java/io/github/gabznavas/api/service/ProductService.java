package io.github.gabznavas.api.service;

import io.github.gabznavas.api.dto.ProductDTO;
import io.github.gabznavas.api.entity.Product;
import io.github.gabznavas.api.exception.ProductAlreadyExistsByException;
import io.github.gabznavas.api.mapper.ProductMapper;
import io.github.gabznavas.api.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ProductService {

    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private ProductMapper productMapper;

    public List<ProductDTO> findAllProducts() {
        return productRepository.findAll()
                .stream()
                .map(productMapper::entityToDTO)
                .toList();
    }

    public ProductDTO createProduct(ProductDTO dto) {

        final Optional<Product> productByName = productRepository.findByName(dto.name());
        if (productByName.isPresent()) {
            throw new ProductAlreadyExistsByException("name");
        }

        final Product product = new Product();

        productRepository.save(product);

        return productMapper.entityToDTO(product);
    }
}
