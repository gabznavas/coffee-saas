package io.github.gabznavas.api.controller;

import io.github.gabznavas.api.dto.CommandDto;
import io.github.gabznavas.api.dto.CommandFilterDto;
import io.github.gabznavas.api.dto.CreateCommandDto;
import io.github.gabznavas.api.dto.PaginatedResponse;
import io.github.gabznavas.api.service.CommandService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;


@RestController
@RequestMapping("/api/v1/command")
public class CommandController {

    @Autowired
    private CommandService commandService;

    @PostMapping
    public ResponseEntity<CommandDto> createCommand(@RequestBody @Valid CreateCommandDto dto) {
        return ResponseEntity.status(HttpStatus.CREATED).body(commandService.createCommand(dto));
    }

    @GetMapping
    public ResponseEntity<PaginatedResponse<CommandDto>> findAllCommands(
            @RequestParam(name = "query") String query,
            @RequestParam(name = "state") String state,
            @RequestParam(name = "minDate") String minDate,
            @RequestParam(name = "maxDate") String maxDate,
            Pageable page
    ) {
        final CommandFilterDto.CommandState commandState = CommandFilterDto.CommandState.valueOf(state);
        
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd'T'HH:mm");

        LocalDateTime minDateTime = minDate != null ? LocalDateTime.parse(minDate, formatter) : null;
        LocalDateTime maxDateTime = maxDate != null ? LocalDateTime.parse(maxDate, formatter) : null;

        CommandFilterDto filterDto = new CommandFilterDto(query, commandState, minDateTime, maxDateTime, page);

        PaginatedResponse<CommandDto> commands = commandService.findAllCommands(filterDto);

        return ResponseEntity.status(HttpStatus.CREATED).body(commands);
    }
}
