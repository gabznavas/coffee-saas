package io.github.gabznavas.api.controller;

import io.github.gabznavas.api.dto.CommandItemDto;
import io.github.gabznavas.api.dto.CreateCommandItemDto;
import io.github.gabznavas.api.dto.PaginatedResponse;
import io.github.gabznavas.api.service.CommandItemService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/command/{commandId}/item")
public class CommandItemController {

    @Autowired
    private CommandItemService commandItemService;

    @GetMapping()
    public ResponseEntity<PaginatedResponse<CommandItemDto>> findAllCommandItemByCommandId(
            @PathVariable("commandId") Long commandId,
            Pageable page
    ) {
        return ResponseEntity.ok(commandItemService.findAllCommandItemByCommandId(commandId, page));
    }

    @PostMapping()
    public ResponseEntity<?> addCommandItemToCommand(
            @PathVariable("commandId") Long commandId,
            @RequestBody CreateCommandItemDto dto
    ) {
        commandItemService.addCommandItemToCommand(commandId, dto);
        return ResponseEntity.status(HttpStatus.CREATED).build();
    }
}
