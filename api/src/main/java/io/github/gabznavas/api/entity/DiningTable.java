package io.github.gabznavas.api.entity;

import jakarta.persistence.*;

import java.time.LocalDateTime;
import java.util.Objects;

@Entity
@Table(name = "dining_table")
public class DiningTable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Long id;

    @Column(name = "name", length = 45, unique = true, nullable = false)
    String name;

    @Column(name = "busy", nullable = false)
    Boolean busy;

    @Column(name = "created_at", nullable = false)
    LocalDateTime createdAt;

    @Column(name = "updated_at")
    LocalDateTime updatedAt;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Boolean getBusy() {
        return busy;
    }

    public void setBusy(Boolean busy) {
        this.busy = busy;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }

    public LocalDateTime getUpdatedAt() {
        return updatedAt;
    }

    public void setUpdatedAt(LocalDateTime updatedAt) {
        this.updatedAt = updatedAt;
    }

    @Override
    public boolean equals(Object o) {
        if (o == null || getClass() != o.getClass()) return false;
        DiningTable diningTable = (DiningTable) o;
        return Objects.equals(id, diningTable.id) && Objects.equals(name, diningTable.name) && Objects.equals(busy, diningTable.busy) && Objects.equals(createdAt, diningTable.createdAt) && Objects.equals(updatedAt, diningTable.updatedAt);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, name, busy, createdAt, updatedAt);
    }
}
