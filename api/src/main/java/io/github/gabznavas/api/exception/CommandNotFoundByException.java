package io.github.gabznavas.api.exception;

public class CommandNotFoundByException extends RuntimeException {

    public CommandNotFoundByException(String attribute) {
        super(String.format("Comanda não encontrada por %s", attribute));
    }
}
