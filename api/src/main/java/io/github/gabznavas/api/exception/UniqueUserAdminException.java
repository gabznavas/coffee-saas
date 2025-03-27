package io.github.gabznavas.api.exception;

public class UniqueUserAdminException extends RuntimeException {

    public UniqueUserAdminException() {
        super("Impossível deletar o último usuário Admin do sistema.");
    }
}
