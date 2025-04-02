package io.github.gabznavas.api.exception;

public class IncorrectFormatQueryException extends RuntimeException {

    public IncorrectFormatQueryException(String attribute) {
        super(String.format("Incorrect query param by %s", attribute));
    }
}
