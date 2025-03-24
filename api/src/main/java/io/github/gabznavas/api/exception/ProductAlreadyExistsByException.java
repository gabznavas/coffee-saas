package io.github.gabznavas.api.exception;

public class ProductAlreadyExistsByException extends RuntimeException {
    public ProductAlreadyExistsByException(String attribute) {
        super(String.format("Product already exists by %s", attribute));
    }
}
