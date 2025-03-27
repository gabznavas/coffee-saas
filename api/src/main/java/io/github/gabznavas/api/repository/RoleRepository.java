package io.github.gabznavas.api.repository;

import io.github.gabznavas.api.entity.Role;
import io.github.gabznavas.api.entity.RoleNameType;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface RoleRepository extends JpaRepository<Role, Long> {
    Optional<Role> findByNameType(RoleNameType roleNameType);

    List<Role> findAllByOrderByIdDesc();
}
