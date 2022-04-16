package com.upce.libraryspring.book.dto;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.upce.libraryspring.author.AuthorDto;
import com.upce.libraryspring.genre.GenreDto;
import com.upce.libraryspring.library.Library;
import lombok.*;
import com.upce.libraryspring.book.BookState;

import javax.validation.constraints.Max;
import javax.validation.constraints.Min;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.PositiveOrZero;
import java.io.Serializable;
import java.util.Set;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class BookDto implements Serializable {
    private Integer id;
    @NotNull
    private String name;
    private String description;
    private String isbn;
    @PositiveOrZero(message = "Number of pages has to be equal or greater than 0.")
    private Integer numberOfPages;
    @Max(10)
    @Min(0)
    private Integer score;
    private String evaluation;
    private BookState bookState;
    private Set<GenreDto> bookGenres;
    private Set<AuthorDto> booAuthors;
    @JsonIgnore
    private Library library;
}
