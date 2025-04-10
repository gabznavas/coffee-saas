package io.github.gabznavas.api.repository;

import io.github.gabznavas.api.entity.CommandItem;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface CommandItemRepository extends JpaRepository<CommandItem, Long> {
    @Query("""
                SELECT ci FROM CommandItem ci 
                JOIN ci.product p
                JOIN ci.command c
                WHERE  
                c.id = :commandId    
            
                AND (
                  :query IS NULL 
                  OR LOWER(p.name) LIKE LOWER(CONCAT('%', :query, '%'))
                )
            
                AND :query IS NULL OR LOWER(ci.observations) LIKE LOWER(CONCAT('%', :query, '%'))
            """)
    Page<CommandItem> findAllCommandItemsFiltered(
            @Param("commandId") Long commandId,
            @Param("query") String query,
            Pageable pageable
    );

    List<CommandItem> findAllByCommandId(Long commandId);
}
