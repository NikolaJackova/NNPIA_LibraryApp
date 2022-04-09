package com.upce.libraryspring.book;

import com.upce.libraryspring.genre.Genre;
import com.upce.libraryspring.library.Library;
import lombok.Data;

import javax.persistence.*;
import javax.validation.constraints.*;
import java.util.Set;

@Entity
@Data
public class Book {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(nullable = false, updatable = false)
    private Integer id;

    @NotNull
    private String name;

    @Column(length = 1000)
    private String description;

    private Integer publishedYear;

    private String isbn;

    @PositiveOrZero(message = "Number of pages has to be equal or greater than 0.")
    private Integer numberOfPages;

    @Max(10)
    @Min(0)
    private Integer score;

    @Column(length = 500)
    private String evaluation;

    @Enumerated(EnumType.STRING)
    @Column(name = "book_state")
    private BookState bookState;

    @ManyToMany(cascade = {
            CascadeType.PERSIST,
            CascadeType.MERGE
    })
    @JoinTable(name = "BOOK_GENRE", joinColumns = @JoinColumn(name = "book_id"), inverseJoinColumns = @JoinColumn(name = "genre_id"))
    private Set<Genre> bookGenres;

    @ManyToMany(cascade = {
            CascadeType.PERSIST,
            CascadeType.MERGE
    })
    @JoinTable(name = "BOOK_AUTHOR", joinColumns = @JoinColumn(name = "book_id"), inverseJoinColumns = @JoinColumn(name = "author_id"))
    private Set<Genre> bookAuthors;

    @ManyToOne
    @JoinColumn
    @MapsId("id")
    private Library library;
}
