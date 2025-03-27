package io.github.gabznavas.api.controller;

import io.github.gabznavas.api.dto.*;
import io.github.gabznavas.api.entity.User;
import io.github.gabznavas.api.mapper.UserMapper;
import io.github.gabznavas.api.service.UserService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/user")
@Tag(name = "User", description = "Endpoints for Managing User")
public class UserController {

    @Autowired
    private UserMapper userMapper;

    @Autowired
    private UserService userService;

    @Operation(
            summary = "Delete user by id.",
            description = "Delete user by id.",
            security = @SecurityRequirement(name = "bearerAuth"),
            tags = {"User"},
            responses = {
                    @ApiResponse(
                            description = "No COntent",
                            responseCode = "204",
                            content = @Content
                    ),
                    @ApiResponse(description = "Bad Request", responseCode = "400", content = @Content),
                    @ApiResponse(description = "Unauthorized", responseCode = "401", content = @Content),
                    @ApiResponse(description = "Not Found", responseCode = "404", content = @Content),
                    @ApiResponse(description = "Internal Server Error", responseCode = "500", content = @Content),
            }
    )
    @DeleteMapping(value = "/{userId}")
    public ResponseEntity<?> deleteUser(@PathVariable("userId") Long userId) {
        userService.deleteUser(userId);
        return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
    }

    @Operation(
            summary = "Update user.",
            description = "Update user by Admin or Manager.",
            security = @SecurityRequirement(name = "bearerAuth"),
            tags = {"User"},
            responses = {
                    @ApiResponse(
                            description = "No COntent",
                            responseCode = "204",
                            content = @Content
                    ),
                    @ApiResponse(description = "Bad Request", responseCode = "400", content = @Content),
                    @ApiResponse(description = "Unauthorized", responseCode = "401", content = @Content),
                    @ApiResponse(description = "Not Found", responseCode = "404", content = @Content),
                    @ApiResponse(description = "Internal Server Error", responseCode = "500", content = @Content),
            }
    )
    @PatchMapping(
            value = "/{userId}",
            consumes = {
                    MediaType.APPLICATION_JSON_VALUE,
                    MediaType.APPLICATION_XML_VALUE,
                    MediaType.APPLICATION_YAML_VALUE,
            }
    )
    public ResponseEntity<?> updateUser(
            @PathVariable("userId") Long userId,
            @RequestBody UpdateUserDTO dto
    ) {
        userService.updateUser(userId, dto);
        return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
    }

    @Operation(
            summary = "Register user.",
            description = "Register user.",
            security = @SecurityRequirement(name = "bearerAuth"),
            tags = {"User"},
            responses = {
                    @ApiResponse(
                            description = "Ok",
                            responseCode = "200",
                            content = @Content(
                                    mediaType = MediaType.APPLICATION_JSON_VALUE,
                                    schema = @Schema(implementation = UserDTO.class)
                            )
                    ),
                    @ApiResponse(description = "Bad Request", responseCode = "400", content = @Content),
                    @ApiResponse(description = "Unauthorized", responseCode = "401", content = @Content),
                    @ApiResponse(description = "Not Found", responseCode = "404", content = @Content),
                    @ApiResponse(description = "Internal Server Error", responseCode = "500", content = @Content),
            }
    )
    @PostMapping(
            produces = {
                    MediaType.APPLICATION_JSON_VALUE,
                    MediaType.APPLICATION_XML_VALUE,
                    MediaType.APPLICATION_YAML_VALUE,
            },
            consumes = {
                    MediaType.APPLICATION_JSON_VALUE,
                    MediaType.APPLICATION_XML_VALUE,
                    MediaType.APPLICATION_YAML_VALUE,
            }
    )
    public ResponseEntity<UserDTO> registerUser(@RequestBody RegisterUserDTO dto) {
        return ResponseEntity.status(HttpStatus.CREATED).body(userService.registerUser(dto));
    }

    @Operation(
            summary = "Get user logged.",
            description = "Get the logged in user itself.",
            security = @SecurityRequirement(name = "bearerAuth"),
            tags = {"User"},
            responses = {
                    @ApiResponse(
                            description = "Ok",
                            responseCode = "200",
                            content = @Content(
                                    mediaType = MediaType.APPLICATION_JSON_VALUE,
                                    schema = @Schema(implementation = UserDTO.class)
                            )
                    ),
                    @ApiResponse(description = "Bad Request", responseCode = "400", content = @Content),
                    @ApiResponse(description = "Unauthorized", responseCode = "401", content = @Content),
                    @ApiResponse(description = "Not Found", responseCode = "404", content = @Content),
                    @ApiResponse(description = "Internal Server Error", responseCode = "500", content = @Content),
            }
    )
    @GetMapping(
            value = "/logged",
            produces = {
                    MediaType.APPLICATION_JSON_VALUE,
                    MediaType.APPLICATION_XML_VALUE,
                    MediaType.APPLICATION_YAML_VALUE,
            }
    )
    public ResponseEntity<UserDTO> getUserLogged(@AuthenticationPrincipal UserDetails user) {
        final UserDTO dto = userService.findUserByEmail(user.getUsername());
        return ResponseEntity.ok(dto);
    }


    @Operation(
            summary = "Find User by Id.",
            description = "Find User By Id.",
            security = @SecurityRequirement(name = "bearerAuth"),
            tags = {"User"},
            responses = {
                    @ApiResponse(
                            description = "Ok",
                            responseCode = "200",
                            content = @Content(
                                    mediaType = MediaType.APPLICATION_JSON_VALUE,
                                    schema = @Schema(implementation = UserDTO.class)
                            )
                    ),
                    @ApiResponse(description = "Bad Request", responseCode = "400", content = @Content),
                    @ApiResponse(description = "Unauthorized", responseCode = "401", content = @Content),
                    @ApiResponse(description = "Not Found", responseCode = "404", content = @Content),
                    @ApiResponse(description = "Internal Server Error", responseCode = "500", content = @Content),
            }
    )
    @GetMapping(
            value = "/{userId}",
            produces = {
                    MediaType.APPLICATION_JSON_VALUE,
                    MediaType.APPLICATION_XML_VALUE,
                    MediaType.APPLICATION_YAML_VALUE,
            }
    )
    public ResponseEntity<UserDTO> findUserById(
            @PathVariable("userId") Long userId
    ) {
        final UserDTO dto = userService.findUserById(userId);
        return ResponseEntity.ok(dto);
    }

    @GetMapping(
            produces = {
                    MediaType.APPLICATION_JSON_VALUE,
                    MediaType.APPLICATION_XML_VALUE,
                    MediaType.APPLICATION_YAML_VALUE,
            }
    )
    public ResponseEntity<PaginatedResponse<UserDTO>> findAllUsers(
            @RequestParam(name = "query", required = false, defaultValue = "") String query,
            Pageable page
    ) {
        return ResponseEntity.ok(userService.findAllUsers(query, page));
    }

    @Operation(
            summary = "Update profile.",
            description = "Update the logged in user's own profile.",
            tags = {"User"},
            responses = {
                    @ApiResponse(description = "No Content", responseCode = "204", content = @Content),
                    @ApiResponse(description = "Bad Request", responseCode = "400", content = @Content),
                    @ApiResponse(description = "Unauthorized", responseCode = "401", content = @Content),
                    @ApiResponse(description = "Not Found", responseCode = "404", content = @Content),
                    @ApiResponse(description = "Internal Server Error", responseCode = "500", content = @Content),
            }
    )
    @PatchMapping(
            value = "/profile",
            consumes = {
                    MediaType.APPLICATION_JSON_VALUE,
                    MediaType.APPLICATION_XML_VALUE,
                    MediaType.APPLICATION_YAML_VALUE,
            }
    )
    public ResponseEntity<?> updateProfile(@AuthenticationPrincipal UserDetails user, @RequestBody @Valid ProfileDTO dto) {
        userService.updateProfile(((User) user).getId(), dto);
        return ResponseEntity.noContent().build();
    }

    @Operation(
            summary = "Security user.",
            description = "Update the user's own security data.",
            tags = {"User"},
            responses = {
                    @ApiResponse(description = "No Content", responseCode = "204", content = @Content),
                    @ApiResponse(description = "Bad Request", responseCode = "400", content = @Content),
                    @ApiResponse(description = "Unauthorized", responseCode = "401", content = @Content),
                    @ApiResponse(description = "Not Found", responseCode = "404", content = @Content),
                    @ApiResponse(description = "Internal Server Error", responseCode = "500", content = @Content),
            }
    )
    @PatchMapping(
            value = "/security",
            consumes = {
                    MediaType.APPLICATION_JSON_VALUE,
                    MediaType.APPLICATION_XML_VALUE,
                    MediaType.APPLICATION_YAML_VALUE,
            }
    )
    public ResponseEntity<?> updateSecurity(@AuthenticationPrincipal UserDetails user, @RequestBody @Valid SecurityDTO dto) {
        userService.updateSecurity(((User) user).getId(), dto);
        return ResponseEntity.noContent().build();
    }
}
