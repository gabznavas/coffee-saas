package io.github.gabznavas.api.exception;

public class GenerateJWTTokenException extends RuntimeException {
    public GenerateJWTTokenException() {
        super("Error while generating token.");
    }
}
