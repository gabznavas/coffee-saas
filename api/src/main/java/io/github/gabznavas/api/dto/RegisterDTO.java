package io.github.gabznavas.api.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import org.hibernate.validator.constraints.Length;

public record RegisterDTO(
        @NotBlank
        @Length(min = 2, max = 255, message = "minimum 2 characters and maximum 50 characters")
        String fullName,

        @NotBlank
        @Email(message = "email wrong")
        String email,

        @Length(min = 6, max = 255, message = "minimum 6 characters and maximum 255 characters")
        @NotBlank
        String password,

        @Length(min = 6, max = 255, message = "minimum 6 characters and maximum 255 characters")
        @NotBlank
        String passwordConfirmation
) {
}
