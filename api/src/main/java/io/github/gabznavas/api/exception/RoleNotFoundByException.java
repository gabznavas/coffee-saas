package io.github.gabznavas.api.exception;

public class RoleNotFoundByException extends RuntimeException {
    public RoleNotFoundByException(String attribute) {
        super(String.format("Role not found by %s.", attribute));
    }
}
