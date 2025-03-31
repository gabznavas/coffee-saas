package io.github.gabznavas.api.exception;

public class DiningTableAlreadyExistsByException extends RuntimeException {

    public DiningTableAlreadyExistsByException(String attribute) {
        super(String.format("Mesa já existe com esse %s", attribute));
    }
}
