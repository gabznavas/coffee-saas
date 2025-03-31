package io.github.gabznavas.api.mapper;

import io.github.gabznavas.api.dto.CommandDto;
import io.github.gabznavas.api.entity.Command;
import org.springframework.stereotype.Component;

@Component
public class CommandMapper {

    public CommandDto entityToDTO(Command command) {
        return new CommandDto(
                command.getId(),
                command.getClientName(),
                command.getDiningTable().getId(),
                command.getAttendant().getId(),
                command.getOpenedAt(),
                command.getCanceledIn(),
                command.getClosedAt()
        );
    }
}
