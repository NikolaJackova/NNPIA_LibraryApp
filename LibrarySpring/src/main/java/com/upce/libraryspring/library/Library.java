package com.upce.libraryspring.library;

import com.upce.libraryspring.book.Book;
import com.upce.libraryspring.user.User;
import lombok.Data;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.util.Set;

@Entity
@Data
public class Library {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(nullable = false, updatable = false)
    private Integer id;

    @NotNull
    private String name;

    private String description;

    @Enumerated(EnumType.STRING)
    @Column(name = "library_type")
    private LibraryType libraryType;

    @OneToMany(mappedBy = "library", fetch = FetchType.LAZY)
    private Set<Book> libraryBooks;

    @ManyToOne
    @JoinColumn
    @MapsId("id")
    private User user;
}
