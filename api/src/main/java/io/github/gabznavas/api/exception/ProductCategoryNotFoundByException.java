package io.github.gabznavas.api.exception;

public class ProductCategoryNotFoundByException extends RuntimeException {

    public ProductCategoryNotFoundByException(String attribute) {
        super(String.format("product not found by %s", attribute));
    }
}
