package com.upce.libraryspring.role;

import lombok.Data;

import javax.persistence.*;
import javax.validation.constraints.NotNull;

@Entity
@Data
public class Role {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(nullable = false, unique = true)
    private Integer id;

    @NotNull
    @Enumerated(EnumType.STRING)
    @Column(name = "role_type", unique = true, nullable = false)
    private RoleType roleType;

    private String description;
}
