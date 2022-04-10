package com.upce.libraryspring.role;

import com.upce.libraryspring.book.Book;
import com.upce.libraryspring.user.User;
import lombok.Data;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.util.HashSet;
import java.util.Set;

@Entity
@Data
public class Role {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(updatable = false)
    private Integer id;
    @NotNull
    @Enumerated(EnumType.STRING)
    @Column(name = "role_type", nullable = false, unique = true, updatable = false)
    private RoleType roleType;

    private String description;

    @ManyToMany(mappedBy = "userRoles", fetch=FetchType.LAZY)
    private Set<User> roleUsers = new HashSet<>();
}
