package io.github.gabznavas.api.service;

import io.github.gabznavas.api.dto.CommandDto;
import io.github.gabznavas.api.dto.CommandFilterDto;
import io.github.gabznavas.api.dto.CreateCommandDto;
import io.github.gabznavas.api.dto.PaginatedResponse;
import io.github.gabznavas.api.entity.Command;
import io.github.gabznavas.api.entity.DiningTable;
import io.github.gabznavas.api.entity.User;
import io.github.gabznavas.api.exception.DiningTableNotFoundByException;
import io.github.gabznavas.api.exception.UserNotFoundByException;
import io.github.gabznavas.api.mapper.CommandMapper;
import io.github.gabznavas.api.repository.CommandRepository;
import io.github.gabznavas.api.repository.DiningTableRepository;
import io.github.gabznavas.api.repository.UserRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.time.LocalDateTime;
import java.util.List;

@Service
public class CommandService {

    @Autowired
    private CommandRepository commandRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private DiningTableRepository diningTableRepository;

    @Autowired
    private CommandMapper commandMapper;


    @Transactional
    public CommandDto createCommand(CreateCommandDto dto) {
        final User user = userRepository.findById(dto.attendentId())
                .orElseThrow(() -> new UserNotFoundByException("id"));

        final DiningTable diningTable = diningTableRepository.findById(dto.diningTableId())
                .orElseThrow(() -> new DiningTableNotFoundByException("id"));

        final Command command = new Command();
        command.setClientName(dto.clientName().trim());
        command.setAttendant(user);
        command.setOpenedAt(Instant.now());
        command.setDiningTable(diningTable);
        command.setPriceTotal(0D);

        commandRepository.save(command);

        diningTable.setBusy(true);
        diningTable.setUpdatedAt(LocalDateTime.now());
        diningTableRepository.save(diningTable);

        return commandMapper.entityToDTO(command);
    }

    public PaginatedResponse<CommandDto> findAllCommands(CommandFilterDto filter) {
        Instant openedAtMin = filter.state() == CommandFilterDto.CommandState.OPENED ? filter.minDate() : null;
        Instant openedAtMax = filter.state() == CommandFilterDto.CommandState.OPENED ? filter.maxDate() : null;

        Instant closedAtMin = filter.state() == CommandFilterDto.CommandState.CLOSE ? filter.minDate() : null;
        Instant closedAtMax = filter.state() == CommandFilterDto.CommandState.CLOSE ? filter.maxDate() : null;

        Instant canceledInMin = filter.state() == CommandFilterDto.CommandState.CANCELED ? filter.minDate() : null;
        Instant canceledInMax = filter.state() == CommandFilterDto.CommandState.CANCELED ? filter.maxDate() : null;

        final Page<Command> commandsPage = commandRepository.findAllCommandsFiltered(
                filter.query(),
                filter.minPrice(),
                filter.maxPrice(),
                null,
                openedAtMin,
                openedAtMax,
                closedAtMin,
                closedAtMax,
                canceledInMin,
                canceledInMax,
                filter.page()
        );

        final List<CommandDto> commandDtos = commandsPage.map(commandMapper::entityToDTO).toList();
        return new PaginatedResponse<>(
                commandDtos,
                commandsPage.getSize(),
                commandsPage.getTotalPages(),
                filter.page().getPageSize(),
                filter.page().getPageNumber()
        );
    }
}
