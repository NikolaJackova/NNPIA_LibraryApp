package com.upce.libraryspring.user;

import com.upce.libraryspring.genre.Genre;
import com.upce.libraryspring.role.Role;
import lombok.Data;

import javax.persistence.*;
import javax.validation.constraints.Past;
import java.sql.Date;
import java.sql.Time;
import java.util.Set;

@Entity
@Data
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(nullable = false, updatable = false)
    private Integer id;

    @Column(nullable = false, unique = true)
    private String username;
    @Column(nullable = false)
    private String password;
    @Column(nullable = false)
    private String email;
    @Past(message = "Birth date cannot be in future or present.")
    private Date birthDate;
    @Column(columnDefinition = "timestamp default now()")
    private Time creationDate;

    @ManyToMany(cascade = {
            CascadeType.PERSIST,
            CascadeType.MERGE
    })
    @JoinTable(name = "USER_ROLE", joinColumns = @JoinColumn(name = "user_id"), inverseJoinColumns = @JoinColumn(name = "role_id"))
    private Set<Role> userRoles;
}
