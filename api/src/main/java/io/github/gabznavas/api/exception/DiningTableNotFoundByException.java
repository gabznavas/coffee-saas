package io.github.gabznavas.api.exception;

public class DiningTableNotFoundByException extends RuntimeException {

    public DiningTableNotFoundByException(String attribute) {
        super(String.format("Mesa não encontrada por %s", attribute));
    }
}
