package io.github.gabznavas.api.controller;

import io.github.gabznavas.api.dto.PaginatedResponse;
import io.github.gabznavas.api.dto.TableDTO;
import io.github.gabznavas.api.service.DiningTableService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/table")
public class DiningTableController {

    @Autowired
    private DiningTableService diningTableService;

    @GetMapping
    public ResponseEntity<PaginatedResponse<TableDTO>> findAllTables(
            @RequestParam(name = "query", required = false, defaultValue = "") String query,
            Pageable page
    ) {
        return ResponseEntity.ok(diningTableService.findAllTables(query, page));
    }
}
