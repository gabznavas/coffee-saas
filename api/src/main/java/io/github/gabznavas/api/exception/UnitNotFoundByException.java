package io.github.gabznavas.api.exception;

public class UnitNotFoundByException extends RuntimeException {

    public UnitNotFoundByException(String attribute) {
        super(String.format("Unidade não encontrada por %s.", attribute));
    }
}
