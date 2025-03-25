package io.github.gabznavas.api.exception;

public class ProductCategoryNotFoundByException extends RuntimeException {

    public ProductCategoryNotFoundByException(String attribute) {
        super(String.format("Categoria de produto não encontrado por %s.", attribute));
    }
}
