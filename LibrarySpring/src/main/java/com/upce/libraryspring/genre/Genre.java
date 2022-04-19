package com.upce.libraryspring.genre;

import com.upce.libraryspring.book.Book;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.ColumnTransformer;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.util.Set;

@Entity
@Getter
@Setter
public class Genre {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(nullable = false, updatable = false)
    private Integer id;

    @NotNull
    @Column(nullable = false, unique = true)
    @ColumnTransformer(write = "UPPER(?)", read = "UPPER(name)")
    private String name;

    private String description;

    @ManyToMany(mappedBy = "bookGenres", fetch=FetchType.LAZY)
    private Set<Book> genreBooks;

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Genre genre = (Genre) o;
        return id == genre.id;
    }

    @Override
    public int hashCode() {
        return id;
    }
}
