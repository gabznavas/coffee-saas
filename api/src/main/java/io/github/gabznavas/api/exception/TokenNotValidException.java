package io.github.gabznavas.api.exception;

public class TokenNotValidException extends RuntimeException {
    public TokenNotValidException() {
        super("Token não é válido.");
    }
}
