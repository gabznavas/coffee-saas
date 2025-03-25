package io.github.gabznavas.api.exception;

public class ProductAlreadyExistsByException extends RuntimeException {
    public ProductAlreadyExistsByException(String attribute) {
        super(String.format("Produto já existe com esse %s", attribute));
    }
}
