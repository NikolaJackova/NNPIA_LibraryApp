package com.upce.libraryspring.library;

import com.upce.libraryspring.book.Book;
import com.upce.libraryspring.user.User;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.util.HashSet;
import java.util.Set;

@Entity
@Getter
@Setter
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
    private Set<Book> libraryBooks = new HashSet<>();

    @ManyToOne(optional = false)
    @JoinColumn(name = "user_id", referencedColumnName = "id")
    private User user;

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Library library = (Library) o;
        return id == library.id;
    }

    @Override
    public int hashCode() {
        return id;
    }
}
