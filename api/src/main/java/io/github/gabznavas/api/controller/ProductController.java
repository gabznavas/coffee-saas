package io.github.gabznavas.api.controller;

import io.github.gabznavas.api.dto.PaginatedResponse;
import io.github.gabznavas.api.dto.ProductDTO;
import io.github.gabznavas.api.service.ProductService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/products")
public class ProductController {
    @Autowired
    private ProductService productService;

    // ...?page=0&size=10&sort=name,asc
    @GetMapping
    public ResponseEntity<PaginatedResponse<ProductDTO>> findAllProducts(
            @RequestParam(name = "query", required = false, defaultValue = "") String query,
            Pageable page
    ) throws InterruptedException {
        return ResponseEntity.ok(productService.findAllProducts(query, page));
    }

    @GetMapping("/{productId}")
    public ResponseEntity<ProductDTO> findProductById(@PathVariable("productId") @Valid Long productId) {
        return ResponseEntity.ok(productService.findProductById(productId));
    }

    @PostMapping
    public ResponseEntity<ProductDTO> saveProduct(@RequestBody @Valid ProductDTO dto) {
        return ResponseEntity.status(HttpStatus.CREATED).body(productService.saveProduct(dto));
    }

    @PatchMapping("/{productId}")
    public ResponseEntity<ProductDTO> updateProduct(
            @PathVariable("productId") Long productId,
            @RequestBody @Valid ProductDTO dto
    ) {
        productService.updateProduct(productId, dto);
        return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
    }

    @DeleteMapping("/{productId}")
    public ResponseEntity<ProductDTO> deleteProduct(
            @PathVariable("productId") Long productId
    ) {
        productService.deleteProduct(productId);
        return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
    }
}
