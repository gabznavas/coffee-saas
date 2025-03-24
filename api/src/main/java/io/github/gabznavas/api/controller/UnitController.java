package io.github.gabznavas.api.controller;

import io.github.gabznavas.api.dto.UnitDTO;
import io.github.gabznavas.api.service.UnitService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/v1/unit")
public class UnitController {

    @Autowired
    private UnitService UnitService;

    @GetMapping
    public ResponseEntity<List<UnitDTO>> findAll() {
        return ResponseEntity.ok(UnitService.findAll());
    }
}
