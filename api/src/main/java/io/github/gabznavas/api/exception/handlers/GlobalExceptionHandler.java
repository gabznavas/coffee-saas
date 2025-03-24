package io.github.gabznavas.api.exception.handlers;

import io.github.gabznavas.api.exception.*;
import io.github.gabznavas.api.exception.responses.ExceptionMapResponse;
import io.github.gabznavas.api.exception.responses.ExceptionResponse;
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

    @ExceptionHandler(Exception.class)
    public final ResponseEntity<ExceptionResponse> handleAllExceptions(Exception ex, WebRequest request) {
        ExceptionResponse response = new ExceptionResponse(
                LocalDateTime.now(),
                ex.getMessage(),
                request.getDescription(false)
        );
        return ResponseEntity.internalServerError().body(response);
    }

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public final ResponseEntity<ExceptionMapResponse> handleValidationExceptions(
            MethodArgumentNotValidException ex,
            WebRequest request
    ) {
        final Map<String, String> validations = new HashMap<>();

        ex.getBindingResult().getAllErrors().forEach(error -> {
            String fieldName = (((FieldError) error).getField());
            String errorMessage = error.getDefaultMessage();
            validations.put(fieldName, errorMessage);
        });

        ExceptionMapResponse response = new ExceptionMapResponse(
                LocalDateTime.now(),
                validations,
                request.getDescription(false)
        );
        return ResponseEntity.badRequest().body(response);
    }


    @ExceptionHandler({
            UserNotFoundByException.class,
            TokenNotValidException.class,
            GenerateJWTTokenException.class,
            LoginIncorrectException.class,
            PasswordAndPasswordConfirmationDoesNotEqual.class,
            RoleNotFoundByException.class,
            UserAlreadyExistsWithException.class,
            ProductCategoryNotFoundByException.class,
            ProductAlreadyExistsByException.class
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
}
