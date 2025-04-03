package io.github.gabznavas.api.mapper;

import io.github.gabznavas.api.dto.CommandItemDto;
import io.github.gabznavas.api.entity.CommandItem;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class CommandItemMapper {

    @Autowired
    private ProductMapper productMapper;

    public CommandItemDto entityToDTO(CommandItem commandItem) {
        return new CommandItemDto(
                commandItem.getId(),
                commandItem.getCommand().getId(),
                commandItem.getQuantity(),
                commandItem.getPrice(),
                commandItem.getObservations(),
                commandItem.getCanceledIn(),
                new CommandItemDto.Product(
                        commandItem.getProduct().getId(),
                        commandItem.getProduct().getName(),
                        commandItem.getProduct().getPrice()
                )
        );
    }
}
