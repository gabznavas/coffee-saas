package io.github.gabznavas.api.controller;

import io.github.gabznavas.api.dto.DiningTableDTO;
import io.github.gabznavas.api.dto.PaginatedResponse;
import io.github.gabznavas.api.service.DiningTableService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/dining-table")
public class DiningTableController {

    @Autowired
    private DiningTableService diningTableService;

    @GetMapping
    public ResponseEntity<PaginatedResponse<DiningTableDTO>> findAllDiningTables(
            @RequestParam(name = "query", required = false, defaultValue = "") String query,
            Pageable page
    ) {
        return ResponseEntity.ok(diningTableService.findAllTables(query, page));
    }

    @GetMapping("/{diningTableId}")
    public ResponseEntity<DiningTableDTO> findDiningTablesById(
            @PathVariable("diningTableId") Long diningTableId,
            Pageable page
    ) {
        return ResponseEntity.ok(diningTableService.findDiningTableById(diningTableId));
    }

    @PostMapping
    public ResponseEntity<DiningTableDTO> createDiningTable(@RequestBody @Valid DiningTableDTO dto) {
        return ResponseEntity.status(HttpStatus.CREATED).body(diningTableService.createDiningTable(dto));
    }

    @PatchMapping("/{diningTableId}")
    public ResponseEntity<DiningTableDTO> updateDiningTable(
            @PathVariable("diningTableId") Long diningTableId,
            @RequestBody @Valid DiningTableDTO dto
    ) {
        diningTableService.updateDiningTable(diningTableId, dto);
        return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
    }

    @DeleteMapping("/{diningTableId}")
    public ResponseEntity<DiningTableDTO> deleteDiningTable(@PathVariable("diningTableId") Long diningTableId) {
        diningTableService.deleteDiningTableById(diningTableId);
        return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
    }
}
