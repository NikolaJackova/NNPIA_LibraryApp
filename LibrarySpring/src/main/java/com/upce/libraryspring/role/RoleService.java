package com.upce.libraryspring.role;

import java.util.List;

public interface RoleService {
    List<RoleDto> getRoles();
    Role getRoleByRoleType(RoleType roleType);
}
