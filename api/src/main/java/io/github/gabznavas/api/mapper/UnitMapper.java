package io.github.gabznavas.api.mapper;

import io.github.gabznavas.api.dto.UnitDTO;
import io.github.gabznavas.api.entity.Unit;
import org.springframework.stereotype.Component;

@Component
public class UnitMapper {

    public UnitDTO entityToDTO(Unit unit) {
        return new UnitDTO(
                unit.getId(),
                unit.getName(),
                unit.getAcronym()
        );
    }
}
