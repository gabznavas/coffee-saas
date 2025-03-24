package io.github.gabznavas.api.service;

import io.github.gabznavas.api.dto.ProductCategoryDTO;
import io.github.gabznavas.api.mapper.ProductCategoryMapper;
import io.github.gabznavas.api.repository.ProductCategoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProductCategoryService {

    @Autowired
    private ProductCategoryRepository productCategoryRepository;

    @Autowired
    private ProductCategoryMapper productCategoryMapper;


    public List<ProductCategoryDTO> findAll() {
        return productCategoryRepository.findAll()
                .stream()
                .map(productCategoryMapper::entityToDTO)
                .toList();
    }
}
