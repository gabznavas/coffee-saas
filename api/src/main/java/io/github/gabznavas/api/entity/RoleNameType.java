package io.github.gabznavas.api.entity;


public enum RoleNameType {
    MANAGER,
    CASHIER,
    ATTENDANT,
    ADMIN;

    public String toSpringSecurityRole() {
        return String.format("ROLE_%s", name());
    }
}