package io.github.gabznavas.api.controller;

import io.github.gabznavas.api.dto.LoginDTO;
import io.github.gabznavas.api.dto.RegisterDTO;
import io.github.gabznavas.api.dto.TokenDTO;
import io.github.gabznavas.api.log.LoggerCustom;
import io.github.gabznavas.api.service.LoginService;
import io.github.gabznavas.api.service.RegisterService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/auth")
@Tag(name = "Security", description = "Endpoints for Managing Security")
public class AuthenticationController {

    private static final Logger logger = LoggerFactory.getLogger(AuthenticationController.class);

    @Autowired
    private LoginService loginService;

    @Autowired
    private RegisterService registerService;


    @Operation(
            summary = "Make Login",
            description = "Make login and receive a token",
            tags = {"Security"},
            responses = {
                    @ApiResponse(
                            description = "Ok",
                            responseCode = "200",
                            content = @Content(
                                    mediaType = MediaType.APPLICATION_JSON_VALUE,
                                    schema = @Schema(implementation = TokenDTO.class)
                            )
                    ),
                    @ApiResponse(description = "Bad Request", responseCode = "400", content = @Content),
                    @ApiResponse(description = "Unauthorized", responseCode = "401", content = @Content),
                    @ApiResponse(description = "Not Found", responseCode = "404", content = @Content),
                    @ApiResponse(description = "Internal Server Error", responseCode = "500", content = @Content),
            }
    )
    @PostMapping(
            value = "/login",
            consumes = {
                    MediaType.APPLICATION_JSON_VALUE,
                    MediaType.APPLICATION_XML_VALUE,
                    MediaType.APPLICATION_YAML_VALUE,
            },
            produces = {
                    MediaType.APPLICATION_JSON_VALUE,
                    MediaType.APPLICATION_XML_VALUE,
                    MediaType.APPLICATION_YAML_VALUE,
            }
    )
    public ResponseEntity<TokenDTO> login(@RequestBody @Valid LoginDTO dto) {
        LoggerCustom.logInfo(AuthenticationController.class, "Login attempt for user: %s", dto.email());
        long startTime = System.currentTimeMillis();

        final String token = loginService.login(dto);
        final TokenDTO tokenDTO = new TokenDTO(token);

        long duration = System.currentTimeMillis() - startTime;
        LoggerCustom.logInfo(AuthenticationController.class, "Login successful for user: %s (%dms)", dto.email(), duration);

        return ResponseEntity.status(HttpStatus.OK).body(tokenDTO);
    }

    @Operation(
            summary = "Register",
            description = "Create a account to access application.",
            tags = {"Security"},
            responses = {
                    @ApiResponse(
                            description = "Ok",
                            responseCode = "204",
                            content = @Content(
                                    mediaType = MediaType.APPLICATION_JSON_VALUE,
                                    schema = @Schema(implementation = TokenDTO.class)
                            )
                    ),
                    @ApiResponse(description = "Bad Request", responseCode = "400", content = @Content),
                    @ApiResponse(description = "Unauthorized", responseCode = "401", content = @Content),
                    @ApiResponse(description = "Not Found", responseCode = "404", content = @Content),
                    @ApiResponse(description = "Internal Server Error", responseCode = "500", content = @Content),
            }
    )
    @PostMapping(
            value = "/register",
            consumes = {
                    MediaType.APPLICATION_JSON_VALUE,
                    MediaType.APPLICATION_XML_VALUE,
                    MediaType.APPLICATION_YAML_VALUE,
            },
            produces = {
                    MediaType.APPLICATION_JSON_VALUE,
                    MediaType.APPLICATION_XML_VALUE,
                    MediaType.APPLICATION_YAML_VALUE,
            }
    )
    public ResponseEntity<TokenDTO> register(@RequestBody @Valid RegisterDTO dto) {
        LoggerCustom.logInfo(AuthenticationController.class, "Register and Login attempt for user: %s", dto.email());
        long startTime = System.currentTimeMillis();

        registerService.register(dto);
        final String token = loginService.login(new LoginDTO(dto.email(), dto.password()));
        final TokenDTO tokenDTO = new TokenDTO(token);

        long duration = System.currentTimeMillis() - startTime;
        LoggerCustom.logInfo(AuthenticationController.class, "Register and Login successful for user: %s (%dms)", dto.email(), duration);

        return ResponseEntity.status(HttpStatus.CREATED).body(tokenDTO);
    }
}
