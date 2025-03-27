package io.github.gabznavas.api.repository;

import io.github.gabznavas.api.entity.UserRole;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface UserRoleRepository extends JpaRepository<UserRole, UserRole.UserRoleId> {
    @Modifying
    @Query("DELETE FROM UserRole ur WHERE ur.userRoleId.userId = :userId AND ur.userRoleId.roleId = :roleId")
    void deleteByUserIdAndRoleId(@Param("userId") Long userId, @Param("roleId") Long roleId);
}
