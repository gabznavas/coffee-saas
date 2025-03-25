package io.github.gabznavas.api.exception;

public class UserNotFoundByException extends RuntimeException {
    public UserNotFoundByException(String attribute) {
        super(String.format("Usuário não encontrado por %s.", attribute));
    }
}
