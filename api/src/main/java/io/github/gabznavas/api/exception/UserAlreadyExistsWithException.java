package io.github.gabznavas.api.exception;

public class UserAlreadyExistsWithException extends RuntimeException {
    public UserAlreadyExistsWithException(String attribute) {
        super(String.format("User already exists with %s.", attribute));
    }
}
