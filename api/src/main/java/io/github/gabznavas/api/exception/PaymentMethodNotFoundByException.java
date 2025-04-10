package io.github.gabznavas.api.exception;

public class PaymentMethodNotFoundByException extends RuntimeException {

    public PaymentMethodNotFoundByException(String attribute) {
        super(String.format("Método de pagamento não encontrado por %s", attribute));
    }
}
