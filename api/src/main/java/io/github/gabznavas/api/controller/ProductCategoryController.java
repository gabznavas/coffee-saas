package io.github.gabznavas.api.controller;

import io.github.gabznavas.api.dto.ProductCategoryDTO;
import io.github.gabznavas.api.service.ProductCategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/v1/product/category")
public class ProductCategoryController {

    @Autowired
    private ProductCategoryService productCategoryService;

    @GetMapping
    public ResponseEntity<List<ProductCategoryDTO>> findAll() {
//        return ResponseEntity.ok(productCategoryService.findAll());
        return ResponseEntity.ok(
                List.of(
                        new ProductCategoryDTO(1L, "Refrigerante"),
                        new ProductCategoryDTO(2L, "Pão"),
                        new ProductCategoryDTO(3L, "Doce")
                )
        );
    }
}
