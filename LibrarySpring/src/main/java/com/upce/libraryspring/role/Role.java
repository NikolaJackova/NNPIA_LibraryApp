package com.upce.libraryspring.role;

import lombok.Data;

import javax.persistence.*;

@Entity
@Data
public class Role {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(nullable = false, unique = true)
    private Integer id;

    @Enumerated(EnumType.STRING)
    @Column(name = "role_type", unique = true)
    private RoleType roleType;

    private String description;
}
