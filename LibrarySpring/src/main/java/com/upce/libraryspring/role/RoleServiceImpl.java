package com.upce.libraryspring.role;

import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class RoleServiceImpl implements RoleService{
    private final RoleRepository roleRepository;
    private final ModelMapper modelMapper;

    public RoleServiceImpl(RoleRepository roleRepository, ModelMapper modelMapper) {
        this.roleRepository = roleRepository;
        this.modelMapper = modelMapper;
    }

    @Override
    public List<RoleDto> getRoles() {
        List<Role> roles = roleRepository.findAll();
        return roles.stream().map(role -> modelMapper.map(role, RoleDto.class)).collect(Collectors.toList());
    }

    @Override
    public Role getRoleByRoleType(RoleType roleType) {
        Role role = roleRepository.findRoleByRoleType(roleType).orElseThrow();
        return role;
    }
}
