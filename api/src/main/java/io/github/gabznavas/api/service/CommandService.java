package io.github.gabznavas.api.service;

import io.github.gabznavas.api.dto.CommandDto;
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
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

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
    public CommandDto createCommand(CommandDto dto) {
        final User user = userRepository.findById(dto.attendentId())
                .orElseThrow(() -> new UserNotFoundByException("id"));

        final DiningTable diningTable = diningTableRepository.findById(dto.diningTableId())
                .orElseThrow(() -> new DiningTableNotFoundByException("id"));

        final Command command = new Command();
        command.setClientName(dto.clientName().trim());
        command.setAttendant(user);
        command.setOpenedAt(LocalDateTime.now());
        command.setDiningTable(diningTable);
        command.setPriceTotal(0D);

        commandRepository.save(command);

        diningTable.setBusy(true);
        diningTable.setUpdatedAt(LocalDateTime.now());
        diningTableRepository.save(diningTable);

        return commandMapper.entityToDTO(command);
    }
}
