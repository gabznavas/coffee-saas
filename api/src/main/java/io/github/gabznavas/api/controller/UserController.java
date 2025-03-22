package io.github.gabznavas.api.controller;

import io.github.gabznavas.api.dto.ProfileDTO;
import io.github.gabznavas.api.dto.UserDTO;
import io.github.gabznavas.api.entity.User;
import io.github.gabznavas.api.mapper.UserMapper;
import io.github.gabznavas.api.service.UserService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
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
            summary = "Get user logged.",
            description = "Get the logged in user itself.",
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
        final UserDTO dto = this.userMapper.entityToDTO((User) user);
        return ResponseEntity.ok(dto);
    }

    @PatchMapping(
            value = "/profile",
            consumes = {
                    MediaType.APPLICATION_JSON_VALUE,
                    MediaType.APPLICATION_XML_VALUE,
                    MediaType.APPLICATION_YAML_VALUE,
            }
    )
    public ResponseEntity<?> updateProfile(@AuthenticationPrincipal UserDetails user, @RequestBody ProfileDTO dto) {
        userService.updateProfile(((User) user).getId(), dto);
        return ResponseEntity.noContent().build();
    }
}
