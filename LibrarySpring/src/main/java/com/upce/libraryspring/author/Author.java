package com.upce.libraryspring.author;

import com.upce.libraryspring.book.Book;
import lombok.Data;

import javax.persistence.*;
import javax.validation.constraints.Past;
import java.util.Date;
import java.util.Set;

@Entity
@Data
public class Author {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(nullable = false, updatable = false)
    private Integer id;

    private String firstName;

    @Column(nullable = false)
    private String lastName;

    @Past(message = "Birth date cannot be in future or present.")
    private Date birthDate;

    private String nationality;

    @ManyToMany(mappedBy = "bookAuthors", fetch=FetchType.LAZY)
    private Set<Book> authorBooks;
}
