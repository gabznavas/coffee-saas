package io.github.gabznavas.api.service;

import io.github.gabznavas.api.dto.CommandItemDto;
import io.github.gabznavas.api.dto.PaginatedResponse;
import io.github.gabznavas.api.entity.CommandItem;
import io.github.gabznavas.api.mapper.CommandItemMapper;
import io.github.gabznavas.api.repository.CommandItemRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

@Service
public class CommandItemService {


    @Autowired
    private CommandItemRepository commandItemRepository;

    @Autowired
    private CommandItemMapper commandItemMapper;

    public PaginatedResponse<CommandItemDto> findAllCommandItemByCommandId(Long commandId, Pageable page) {
        final Page<CommandItem> commandItemPage = commandItemRepository.findAllByCommandId(commandId, page);
        return new PaginatedResponse<>(
                commandItemPage.stream()
                        .map(commandItemMapper::entityToDTO)
                        .toList(),
                commandItemPage.getTotalElements(),
                commandItemPage.getTotalPages(),
                commandItemPage.getPageable().getPageSize(),
                commandItemPage.getPageable().getPageNumber()
        );
    }
}
