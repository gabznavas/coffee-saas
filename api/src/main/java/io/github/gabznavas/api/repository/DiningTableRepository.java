package io.github.gabznavas.api.repository;

import io.github.gabznavas.api.entity.DiningTable;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface DiningTableRepository extends JpaRepository<DiningTable, Long> {

    @Query("""
                SELECT dt FROM DiningTable dt
                WHERE LOWER(dt.name) LIKE LOWER(CONCAT('%', :query, '%'))
            """)
    Page<DiningTable> findAllByQuery(@Param("query") String query, Pageable pageable);
}
