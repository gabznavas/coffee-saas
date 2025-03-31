package io.github.gabznavas.api.service;

import io.github.gabznavas.api.dto.DiningTableDTO;
import io.github.gabznavas.api.dto.PaginatedResponse;
import io.github.gabznavas.api.entity.DiningTable;
import io.github.gabznavas.api.exception.DiningTableAlreadyExistsByException;
import io.github.gabznavas.api.exception.DiningTableNotFoundByException;
import io.github.gabznavas.api.mapper.DiningTablesMapper;
import io.github.gabznavas.api.repository.DiningTableRepository;
import jakarta.transaction.Transactional;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class DiningTableService {

    @Autowired
    private DiningTableRepository diningTableRepository;

    @Autowired
    private DiningTablesMapper diningTablesMapper;

    public PaginatedResponse<DiningTableDTO> findAllTables(String query, Pageable page) {
        final Page<DiningTable> paginatedDiningTables = diningTableRepository.findAllByQuery(query, page);
        final List<DiningTableDTO> diningTableDtos = paginatedDiningTables.map(diningTablesMapper::entityToDTO).stream().toList();
        return new PaginatedResponse<>(
                diningTableDtos,
                diningTableDtos.size(),
                paginatedDiningTables.getTotalPages(),
                page.getPageSize(),
                page.getPageNumber()
        );
    }


    @Transactional
    public DiningTableDTO createDiningTable(DiningTableDTO dto) {
        final Optional<DiningTable> optionalDiningTable = diningTableRepository.findByName(dto.name().trim());
        if (optionalDiningTable.isPresent()) {
            throw new DiningTableAlreadyExistsByException("nome");
        }

        final DiningTable diningTable = new DiningTable();
        diningTable.setName(dto.name());
        diningTable.setBusy(false);
        diningTable.setCreatedAt(LocalDateTime.now());

        diningTableRepository.save(diningTable);

        return diningTablesMapper.entityToDTO(diningTable);
    }

    public DiningTableDTO findDiningTableById(Long diningTableId) {
        final DiningTable diningTable = diningTableRepository.findById(diningTableId)
                .orElseThrow(() -> new DiningTableNotFoundByException("id"));
        return diningTablesMapper.entityToDTO(diningTable);
    }

    @Transactional
    public void updateDiningTable(Long diningTableId, @Valid DiningTableDTO dto) {
        final DiningTable diningTable = diningTableRepository.findById(diningTableId)
                .orElseThrow(() -> new DiningTableNotFoundByException("id"));
        diningTable.setName(dto.name());
        diningTable.setUpdatedAt(LocalDateTime.now());
        diningTableRepository.save(diningTable);
    }

    public void deleteDiningTableById(Long diningTableId) {
        final DiningTable diningTable = diningTableRepository.findById(diningTableId)
                .orElseThrow(() -> new DiningTableNotFoundByException("id"));
        diningTableRepository.deleteById(diningTableId);
    }
}
