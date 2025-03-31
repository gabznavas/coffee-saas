package io.github.gabznavas.api.repository;

import io.github.gabznavas.api.entity.Command;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CommandRepository extends JpaRepository<Command, Long> {
}
