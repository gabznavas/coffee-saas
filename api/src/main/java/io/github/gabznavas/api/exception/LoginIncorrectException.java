package io.github.gabznavas.api.exception;

public class LoginIncorrectException extends RuntimeException {
    public LoginIncorrectException() {
        super("E-mail ou senha incorretos.");
    }
}
