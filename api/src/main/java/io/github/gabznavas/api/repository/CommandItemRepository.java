package io.github.gabznavas.api.repository;

import io.github.gabznavas.api.entity.CommandItem;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CommandItemRepository extends JpaRepository<CommandItem, Long> {
    Page<CommandItem> findAllByCommandId(Long commandId, Pageable pageable);
}
