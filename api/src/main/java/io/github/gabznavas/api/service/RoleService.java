package io.github.gabznavas.api.service;

import io.github.gabznavas.api.dto.RoleDTO;
import io.github.gabznavas.api.repository.RoleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class RoleService {

    @Autowired
    private RoleRepository roleRepository;

    public List<RoleDTO> findAllRoles() {
        return this.roleRepository.findAllByOrderByIdDesc()
                .stream()
                .map(role -> new RoleDTO(role.getId(), role.getNameType().name()))
                .toList();
    }
}
