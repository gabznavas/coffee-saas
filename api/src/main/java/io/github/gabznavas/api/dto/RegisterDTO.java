package io.github.gabznavas.api.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.Size;
import org.hibernate.validator.constraints.Length;

import java.util.List;

public record RegisterDTO(
        @NotBlank
        @Size(min = 2, max = 100, message = "minimum 2 characters and maximum 100 characters")
        String fullName,

        @NotBlank
        @Email(message = "email wrong")
        String email,

        @Length(min = 6, max = 255, message = "minimum 6 characters and maximum 255 characters")
        @NotBlank
        String password,

        @Length(min = 6, max = 255, message = "minimum 6 characters and maximum 255 characters")
        @NotBlank
        String passwordConfirmation,

        @NotEmpty(message = "At least one role is required")
        List<Long> rolesIds
) {
}
