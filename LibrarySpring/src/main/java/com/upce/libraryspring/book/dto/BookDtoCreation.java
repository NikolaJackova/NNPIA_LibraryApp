package com.upce.libraryspring.book.dto;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.upce.libraryspring.author.AuthorDto;
import com.upce.libraryspring.genre.GenreDto;
import com.upce.libraryspring.library.Library;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import com.upce.libraryspring.book.BookState;
import javax.validation.constraints.Max;
import javax.validation.constraints.Min;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.PositiveOrZero;
import java.io.Serializable;
import java.util.Set;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class BookDtoCreation implements Serializable {
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
    private Integer publishedYear;
    private BookState bookState;
    private Set<GenreDto> bookGenres;
    private Set<AuthorDto> booAuthors;
    @JsonIgnore
    private Library library;
}
