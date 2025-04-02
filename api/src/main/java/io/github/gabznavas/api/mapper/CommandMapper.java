package io.github.gabznavas.api.mapper;

import io.github.gabznavas.api.dto.CommandDto;
import io.github.gabznavas.api.entity.Command;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class CommandMapper {


    @Autowired
    private DiningTablesMapper diningTablesMapper;

    public CommandDto entityToDTO(Command command) {
        return new CommandDto(
                command.getId(),
                command.getClientName(),
                diningTablesMapper.entityToDTO(command.getDiningTable()),
                command.getPriceTotal(),
                command.getAttendant().getId(),
                command.getOpenedAt(),
                command.getCanceledIn(),
                command.getClosedAt()
        );
    }
}
