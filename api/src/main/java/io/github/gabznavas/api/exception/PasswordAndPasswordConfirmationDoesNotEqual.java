package io.github.gabznavas.api.exception;

public class PasswordAndPasswordConfirmationDoesNotEqual extends RuntimeException {
    public PasswordAndPasswordConfirmationDoesNotEqual() {
        super("Senha e confirmação de senhão não são iguais.");
    }
}
