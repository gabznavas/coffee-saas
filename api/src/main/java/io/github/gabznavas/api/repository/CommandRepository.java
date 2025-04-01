package io.github.gabznavas.api.repository;

import io.github.gabznavas.api.entity.Command;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDateTime;

public interface CommandRepository extends JpaRepository<Command, Long> {
    @Query("""
                SELECT c FROM Command c 
                JOIN c.diningTable dt
                WHERE  
                (
                  :query IS NULL 
                  OR LOWER(c.clientName) LIKE LOWER(CONCAT('%', :query, '%'))
                  OR LOWER(dt.name) LIKE LOWER(CONCAT('%', :query, '%'))
                )
            
                AND (:attendantId IS NULL OR c.attendant.id = :attendantId)
            
                AND (:priceTotalMin IS NULL OR c.priceTotal >= :priceTotalMin)
                AND (:priceTotalMax IS NULL OR c.priceTotal < :priceTotalMax)
            
                AND (:openedAtMin IS NULL OR c.openedAt >= :openedAtMin)
                AND (:openedAtMax IS NULL OR c.openedAt < :openedAtMax)
            
                AND (:closedAtMin IS NULL OR c.closedAt >= :closedAtMin)
                AND (:closedAtMax IS NULL OR c.closedAt < :closedAtMax)
            
                AND (:canceledInMin IS NULL OR c.closedAt >= :canceledInMin)
                AND (:canceledInMax IS NULL OR c.closedAt < :canceledInMax)
            """)
    Page<Command> findAllCommandsFiltered(
            @Param("query") String query,

            @Param("priceTotalMin") Double priceTotalMin,
            @Param("priceTotalMax") Double priceTotalMax,

            @Param("attendantId") Long attendantId,

            @Param("openedAtMin") LocalDateTime openedAtMin,
            @Param("openedAtMax") LocalDateTime openedAtMax,

            @Param("closedAtMin") LocalDateTime closedAtMin,
            @Param("closedAtMax") LocalDateTime closedAtMax,

            @Param("canceledInMin") LocalDateTime canceledInMIn,
            @Param("canceledInMax") LocalDateTime canceledInMax,
            Pageable pageable
    );

}
