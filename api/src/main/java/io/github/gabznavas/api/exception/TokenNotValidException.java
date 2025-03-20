package io.github.gabznavas.api.exception;

public class TokenNotValidException extends RuntimeException {
    public TokenNotValidException() {
        super("Token is not valid");
    }
}
