package com.upce.libraryspring.library;

import lombok.Data;

import javax.persistence.*;

@Entity
@Data
public class Library {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(nullable = false, updatable = false)
    private Integer id;

    private String name;
    private String description;
}
