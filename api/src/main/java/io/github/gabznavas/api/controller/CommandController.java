package io.github.gabznavas.api.controller;

import io.github.gabznavas.api.dto.CommandDto;
import io.github.gabznavas.api.dto.CommandFilterDto;
import io.github.gabznavas.api.dto.CreateCommandDto;
import io.github.gabznavas.api.dto.PaginatedResponse;
import io.github.gabznavas.api.exception.IncorrectFormatQueryException;
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
            @RequestParam(name = "query") String queryParam,
            @RequestParam(name = "state") String stateParam,
            @RequestParam(name = "minDate") String minDateParam,
            @RequestParam(name = "maxDate") String maxDateParam,
            @RequestParam(name = "minPrice") String minPriceParam,
            @RequestParam(name = "maxPrice") String maxPriceParam,
            Pageable page
    ) {
        final CommandFilterDto.CommandState commandState = CommandFilterDto.CommandState.valueOf(stateParam);

        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd'T'HH:mm");

        LocalDateTime minDateTime = minDateParam != null ? LocalDateTime.parse(minDateParam, formatter) : null;
        LocalDateTime maxDateTime = maxDateParam != null ? LocalDateTime.parse(maxDateParam, formatter) : null;

        double minPrice = 0.00D;
        double maxPrice = 0.00D;

        try {
            minPrice = Double.parseDouble(minPriceParam);
        } catch (NumberFormatException ex) {
            throw new IncorrectFormatQueryException("minPrice");
        }

        try {
            maxPrice = Double.parseDouble(maxPriceParam);
        } catch (NumberFormatException ex) {
            throw new IncorrectFormatQueryException("maxPrice");
        }

        CommandFilterDto filterDto = new CommandFilterDto(queryParam, commandState, minDateTime, maxDateTime, minPrice, maxPrice, page);

        PaginatedResponse<CommandDto> commands = commandService.findAllCommands(filterDto);

        return ResponseEntity.status(HttpStatus.CREATED).body(commands);
    }
}
