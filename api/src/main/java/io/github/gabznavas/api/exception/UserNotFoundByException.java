package io.github.gabznavas.api.exception;

public class UserNotFoundByException extends RuntimeException {
    public UserNotFoundByException(String attribute) {
        super(String.format("User not found by %s.", attribute));
    }
}
