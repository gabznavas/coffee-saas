package io.github.gabznavas.api.repository;

import io.github.gabznavas.api.entity.RoleNameType;
import io.github.gabznavas.api.entity.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByEmail(String email);

    @Query("""
                SELECT u FROM User u
                WHERE LOWER(u.fullName) LIKE LOWER(CONCAT('%', :query, '%')) 
                   OR LOWER(u.email) LIKE LOWER(CONCAT('%', :query, '%'))
                ORDER BY u.fullName ASC
            """)
    Page<User> findAllByQuery(@Param("query") String query, Pageable pageable);

    @Query("""
            SELECT COUNT(u) 
            FROM User u 
            JOIN u.userRoles ur 
            JOIN ur.role r 
            WHERE r.nameType = :roleName
            """)
    Long countUsersByRole(@Param("roleName") RoleNameType roleName);
}
