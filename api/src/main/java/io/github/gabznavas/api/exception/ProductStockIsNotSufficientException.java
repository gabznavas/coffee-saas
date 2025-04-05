package io.github.gabznavas.api.exception;

public class ProductStockIsNotSufficientException extends RuntimeException {
    public ProductStockIsNotSufficientException() {
        super("Quantidade de stock desse produto não é suficiente.");
    }
}
