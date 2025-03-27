package io.github.gabznavas.api.exception;

public class UserRoleNotFoundException extends RuntimeException {
    public UserRoleNotFoundException() {
        super("Regra de usuário não encontrado.");
    }
}
