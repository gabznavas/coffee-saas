package io.github.gabznavas.api.exception;

public class UserAlreadyExistsWithException extends RuntimeException {
    public UserAlreadyExistsWithException(String attribute) {
        super(String.format("Usuário já existe com o %s.", attribute));
    }
}
