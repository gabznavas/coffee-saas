package io.github.gabznavas.api.entity;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

@Entity
@Table(name = "roles")
public class Role implements Serializable {
    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Enumerated(EnumType.STRING)
    @Column(name = "name", nullable = false)
    private RoleNameType nameType;

    @OneToMany
    @JsonManagedReference  // Impede recursão ao serializar a lista de UserRole
    private List<UserRole> userRoles = new ArrayList<>();

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public RoleNameType getNameType() {
        return nameType;
    }

    public void setNameType(RoleNameType nameType) {
        this.nameType = nameType;
    }

    public List<UserRole> getUserRoles() {
        return userRoles;
    }

    public void setUserRoles(List<UserRole> userRoles) {
        this.userRoles = userRoles;
    }

    @Override
    public boolean equals(Object o) {
        if (o == null || getClass() != o.getClass()) return false;
        Role role = (Role) o;
        return Objects.equals(id, role.id) && nameType == role.nameType && Objects.equals(userRoles, role.userRoles);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, nameType, userRoles);
    }
}
