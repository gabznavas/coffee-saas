package io.github.gabznavas.api.mapper;

import io.github.gabznavas.api.dto.TableDTO;
import io.github.gabznavas.api.entity.DiningTable;
import org.springframework.stereotype.Component;

@Component
public class DiningTablesMapper {

    public TableDTO entityToDTO(DiningTable diningTable) {
        return new TableDTO(
                diningTable.getId(),
                diningTable.getName(),
                diningTable.getBusy(),
                diningTable.getCreatedAt(),
                diningTable.getUpdatedAt()
        );
    }
}
