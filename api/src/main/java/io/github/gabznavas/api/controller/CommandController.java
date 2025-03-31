package io.github.gabznavas.api.controller;

import io.github.gabznavas.api.dto.CommandDto;
import io.github.gabznavas.api.service.CommandService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/command")
public class CommandController {

    @Autowired
    private CommandService commandService;

    @PostMapping
    public ResponseEntity<CommandDto> createCommand(@RequestBody @Valid CommandDto dto) {
        return ResponseEntity.status(HttpStatus.CREATED).body(commandService.createCommand(dto));
    }
}
