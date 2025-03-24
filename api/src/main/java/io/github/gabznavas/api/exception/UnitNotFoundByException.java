package io.github.gabznavas.api.exception;

public class UnitNotFoundByException extends RuntimeException {

    public UnitNotFoundByException(String attribute) {
        super(String.format("unit not found by %s", attribute));
    }
}
