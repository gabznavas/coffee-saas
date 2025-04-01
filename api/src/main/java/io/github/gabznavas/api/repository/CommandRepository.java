package io.github.gabznavas.api.repository;

import io.github.gabznavas.api.entity.Command;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface CommandRepository extends JpaRepository<Command, Long> {

    @Query("""
                SELECT c FROM Command c 
                JOIN c.diningTable dt
                WHERE (LOWER(c.clientName) LIKE LOWER(CONCAT('%', :query, '%')) 
                   OR LOWER(dt.name) LIKE LOWER(CONCAT('%', :query, '%')))
                AND c.openedAt IS NOT NULL
            """)
    Page<Command> findAllCommandsOpened(@Param("query") String query, Pageable pageable);
}
