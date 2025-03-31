package io.github.gabznavas.api.mapper;

import io.github.gabznavas.api.dto.DiningTableDTO;
import io.github.gabznavas.api.entity.DiningTable;
import org.springframework.stereotype.Component;

@Component
public class DiningTablesMapper {

    public DiningTableDTO entityToDTO(DiningTable diningTable) {
        return new DiningTableDTO(
                diningTable.getId(),
                diningTable.getName(),
                diningTable.getBusy(),
                diningTable.getCreatedAt(),
                diningTable.getUpdatedAt()
        );
    }
}
