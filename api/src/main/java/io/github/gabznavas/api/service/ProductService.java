package io.github.gabznavas.api.service;

import io.github.gabznavas.api.dto.ProductDTO;
import io.github.gabznavas.api.mapper.ProductMapper;
import io.github.gabznavas.api.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

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
}
