package io.github.gabznavas.api.service;

import io.github.gabznavas.api.dto.UnitDTO;
import io.github.gabznavas.api.mapper.UnitMapper;
import io.github.gabznavas.api.repository.UnitRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UnitService {

    @Autowired
    private UnitRepository unitRepository;

    @Autowired
    private UnitMapper unitMapper;

    public List<UnitDTO> findAll() {
        return unitRepository.findAll()
                .stream()
                .map(unitMapper::entityToDTO)
                .toList();
    }
}
