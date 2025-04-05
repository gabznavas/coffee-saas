package io.github.gabznavas.api.service;

import io.github.gabznavas.api.dto.CommandItemDto;
import io.github.gabznavas.api.dto.CreateCommandItemDto;
import io.github.gabznavas.api.dto.PaginatedResponse;
import io.github.gabznavas.api.entity.Command;
import io.github.gabznavas.api.entity.CommandItem;
import io.github.gabznavas.api.entity.Product;
import io.github.gabznavas.api.exception.CommandNotFoundByException;
import io.github.gabznavas.api.exception.ProductNotFoundByException;
import io.github.gabznavas.api.exception.ProductStockIsNotSufficientException;
import io.github.gabznavas.api.mapper.CommandItemMapper;
import io.github.gabznavas.api.repository.CommandItemRepository;
import io.github.gabznavas.api.repository.CommandRepository;
import io.github.gabznavas.api.repository.ProductRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.time.Instant;

@Service
public class CommandItemService {


    @Autowired
    private CommandItemRepository commandItemRepository;


    @Autowired
    private CommandRepository commandRepository;

    @Autowired
    private CommandItemMapper commandItemMapper;

    @Autowired
    private ProductRepository productRepository;

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

    @Transactional
    public void addCommandItemToCommand(Long commandId, CreateCommandItemDto dto) {
        final Product product = productRepository.findById(dto.productId())
                .orElseThrow(() -> new ProductNotFoundByException("id"));

        final Command command = commandRepository.findById(commandId)
                .orElseThrow(() -> new CommandNotFoundByException("id"));

        final long finalQuantity = product.getStock() - dto.quantity();
        if (finalQuantity <= 0) {
            throw new ProductStockIsNotSufficientException();
        }

        final CommandItem commandItem = new CommandItem();
        commandItem.setPrice(dto.price());
        commandItem.setQuantity(dto.quantity());
        commandItem.setObservations(dto.observations());
        commandItem.setProduct(product);
        commandItem.setCommand(command);
        commandItem.setCreatedAt(Instant.now());

        commandItemRepository.save(commandItem);

        product.setStock(finalQuantity);
        productRepository.save(product);
    }
}
