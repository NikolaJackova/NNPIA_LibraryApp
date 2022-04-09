package com.upce.libraryspring.role;

import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotNull;
import java.io.Serializable;

@Data
@NoArgsConstructor
public class RoleDto implements Serializable {
    private Integer id;
    @NotNull
    private RoleType roleType;
    private String description;
}
