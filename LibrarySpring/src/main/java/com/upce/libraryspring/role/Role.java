package com.upce.libraryspring.role;

import com.upce.libraryspring.book.Book;
import com.upce.libraryspring.user.User;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.util.HashSet;
import java.util.Set;

@Entity
@Getter
@Setter
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

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Role role = (Role) o;
        return id == role.id;
    }

    @Override
    public int hashCode() {
        return id;
    }
}
