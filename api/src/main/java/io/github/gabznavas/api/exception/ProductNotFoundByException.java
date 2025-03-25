package io.github.gabznavas.api.exception;

public class ProductNotFoundByException extends RuntimeException {
    public ProductNotFoundByException(String attribute) {
        super(String.format("Produto não encontrado por %s.", attribute));
    }
}
