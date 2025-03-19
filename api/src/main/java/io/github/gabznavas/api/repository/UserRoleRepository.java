package io.github.gabznavas.api.repository;

import io.github.gabznavas.api.entity.UserRole;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRoleRepository extends JpaRepository<UserRole, UserRole.UserRoleId> {
}
