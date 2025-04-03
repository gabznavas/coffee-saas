package io.github.gabznavas.api.exception.handlers;

import io.github.gabznavas.api.exception.*;
import io.github.gabznavas.api.exception.responses.ExceptionMapResponse;
import io.github.gabznavas.api.exception.responses.ExceptionResponse;
import jakarta.validation.ConstraintViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.context.request.WebRequest;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.Map;

@ControllerAdvice
@RestController
public class GlobalExceptionHandler {

    // TODO: add Log

    @ExceptionHandler(Exception.class)
    public final ResponseEntity<ExceptionResponse> handleAllExceptions(Exception ex, WebRequest request) {
        // TODO: add Log
        // TODO:  não mandar erro pro cliente. logar o erro e mandar uma mensagem genérica
        ExceptionResponse response = new ExceptionResponse(
                LocalDateTime.now(),
                ex.getMessage(),
                request.getDescription(false)
        );
        return ResponseEntity.internalServerError().body(response);
    }

    @ExceptionHandler({MethodArgumentNotValidException.class, ConstraintViolationException.class})
    public final ResponseEntity<ExceptionMapResponse> handleValidationExceptions(
            Exception ex,
            WebRequest request
    ) {
        final Map<String, String> validations = new HashMap<>();

        if (ex instanceof MethodArgumentNotValidException manve) {
            // Tratamento para validações de DTOs com @Valid
            manve.getBindingResult().getAllErrors().forEach(error -> {
                String fieldName = (((FieldError) error).getField());
                String errorMessage = error.getDefaultMessage();
                validations.put(fieldName, errorMessage);
            });
        } else if (ex instanceof ConstraintViolationException cve) {
            // Tratamento para validações de anotações em @RequestParam, @PathVariable, etc.
            cve.getConstraintViolations().forEach(violation -> {
                String fieldName = violation.getPropertyPath().toString();
                String errorMessage = violation.getMessage();
                validations.put(fieldName, errorMessage);
            });
        }

        ExceptionMapResponse response = new ExceptionMapResponse(
                LocalDateTime.now(),
                validations,
                request.getDescription(false)
        );

        return ResponseEntity.badRequest().body(response);
    }


    @ExceptionHandler({
            TokenNotValidException.class,
            GenerateJWTTokenException.class,
            LoginIncorrectException.class,
            PasswordAndPasswordConfirmationDoesNotEqual.class,
            UserAlreadyExistsWithException.class,
            ProductAlreadyExistsByException.class,
            UniqueUserAdminException.class,
            DiningTableAlreadyExistsByException.class,
    })
    public final ResponseEntity<ExceptionResponse> handleBadRequestExceptions(
            Exception ex,
            WebRequest request
    ) {
        ExceptionResponse response = new ExceptionResponse(
                LocalDateTime.now(),
                ex.getMessage(),
                request.getDescription(false)
        );
        return ResponseEntity.badRequest().body(response);
    }

    @ExceptionHandler({
            UserNotFoundByException.class,
            RoleNotFoundByException.class,
            ProductCategoryNotFoundByException.class,
            ProductNotFoundByException.class,
            UserRoleNotFoundException.class,
            DiningTableNotFoundByException.class,
            CommandNotFoundByException.class,
    })
    public final ResponseEntity<ExceptionResponse> handleNotFoundExceptions(
            Exception ex,
            WebRequest request
    ) {
        ExceptionResponse response = new ExceptionResponse(
                LocalDateTime.now(),
                ex.getMessage(),
                request.getDescription(false)
        );
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(response);
    }
}
