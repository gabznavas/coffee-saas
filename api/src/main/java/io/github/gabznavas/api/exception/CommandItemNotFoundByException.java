package io.github.gabznavas.api.exception;

public class CommandItemNotFoundByException extends RuntimeException {

    public CommandItemNotFoundByException(String attribute) {
        super(String.format("Item da comanda não encontrada por %s", attribute));
    }
}
