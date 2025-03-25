package io.github.gabznavas.api.service;

import io.github.gabznavas.api.dto.ProductDTO;
import io.github.gabznavas.api.entity.Product;
import io.github.gabznavas.api.entity.ProductCategory;
import io.github.gabznavas.api.entity.Unit;
import io.github.gabznavas.api.exception.ProductAlreadyExistsByException;
import io.github.gabznavas.api.exception.ProductCategoryNotFoundByException;
import io.github.gabznavas.api.exception.ProductNotFoundByException;
import io.github.gabznavas.api.exception.UnitNotFoundByException;
import io.github.gabznavas.api.mapper.ProductMapper;
import io.github.gabznavas.api.repository.ProductCategoryRepository;
import io.github.gabznavas.api.repository.ProductRepository;
import io.github.gabznavas.api.repository.UnitRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class ProductService {

    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private ProductCategoryRepository productCategoryRepository;


    @Autowired
    private UnitRepository unitRepository;

    @Autowired
    private ProductMapper productMapper;

    public List<ProductDTO> findAllProducts() {
        return productRepository.findAllByDeletedAtIsNull()
                .stream()
                .map(productMapper::entityToDTO)
                .toList();
    }

    public ProductDTO findProductById(Long productId) {
        final Product product = productRepository.findById(productId)
                .orElseThrow(() -> new ProductNotFoundByException("id"));
        return productMapper.entityToDTO(product);
    }

    public ProductDTO saveProduct(ProductDTO dto) {

        final Optional<Product> optionalProduct = productRepository.findFirstByNameAndDeletedAtIsNull(dto.name());
        if (optionalProduct.isPresent()) {
            final Product productByName = optionalProduct.get();
            if (productByName.getDeletedAt() == null) {
                throw new ProductAlreadyExistsByException("name");
            }
        }

        final ProductCategory productCategory = productCategoryRepository.findById(dto.categoryId())
                .orElseThrow(() -> new ProductCategoryNotFoundByException("name"));


        final Unit unit = unitRepository.findById(dto.categoryId())
                .orElseThrow(() -> new UnitNotFoundByException("name"));

        final Product product = new Product();
        product.setName(dto.name());
        product.setDescription(dto.description());
        product.setCreatedAt(LocalDateTime.now());
        product.setProductCategory(productCategory);
        product.setStock(dto.stock());
        product.setUnit(unit);

        productRepository.save(product);

        return productMapper.entityToDTO(product);
    }

    public void updateProduct(Long productId, ProductDTO dto) {
        final Optional<Product> optionalProduct = productRepository.findFirstByNameAndDeletedAtIsNull(dto.name());
        if (optionalProduct.isPresent()) {
            final Product productByName = optionalProduct.get();
            if (!productByName.getId().equals(productId) && productByName.getDeletedAt() == null) {
                throw new ProductAlreadyExistsByException("name");
            }
        }

        final Product product = productRepository.findById(productId)
                .orElseThrow(() -> new ProductNotFoundByException("id"));

        final ProductCategory productCategory = productCategoryRepository.findById(dto.categoryId())
                .orElseThrow(() -> new ProductCategoryNotFoundByException("name"));


        final Unit unit = unitRepository.findById(dto.categoryId())
                .orElseThrow(() -> new UnitNotFoundByException("name"));

        product.setName(dto.name());
        product.setDescription(dto.description());
        product.setUpdatedAt(LocalDateTime.now());
        product.setProductCategory(productCategory);
        product.setStock(dto.stock());
        product.setUnit(unit);

        productRepository.save(product);
    }

    public void deleteProduct(Long productId) {
        final Product product = productRepository.findById(productId)
                .orElseThrow(() -> new ProductNotFoundByException("id"));

        product.setDeletedAt(LocalDateTime.now());
        productRepository.save(product);
    }
}
