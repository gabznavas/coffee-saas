package io.github.gabznavas.api.service;

import io.github.gabznavas.api.dto.PaginatedResponse;
import io.github.gabznavas.api.dto.TableDTO;
import io.github.gabznavas.api.entity.DiningTable;
import io.github.gabznavas.api.mapper.DiningTablesMapper;
import io.github.gabznavas.api.repository.DiningTableRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class DiningTableService {

    @Autowired
    private DiningTableRepository diningTableRepository;

    @Autowired
    private DiningTablesMapper diningTablesMapper;

    public PaginatedResponse<TableDTO> findAllTables(String query, Pageable page) {
        final Page<DiningTable> paginatedDiningTables = diningTableRepository.findAllByQuery(query, page);
        final List<TableDTO> tableDtos = paginatedDiningTables.map(diningTablesMapper::entityToDTO).stream().toList();
        return new PaginatedResponse<>(
                tableDtos,
                tableDtos.size(),
                paginatedDiningTables.getTotalPages(),
                page.getPageSize(),
                page.getPageNumber()
        );
    }
}
