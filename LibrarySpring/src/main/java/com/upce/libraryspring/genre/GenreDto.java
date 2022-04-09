package com.upce.libraryspring.genre;

import com.upce.libraryspring.book.BookDto;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotNull;
import java.io.Serializable;
import java.util.Set;

@Data
@NoArgsConstructor
public class GenreDto implements Serializable {
    private Integer id;
    @NotNull
    private String name;
    private String description;
    private Set<BookDto> genreBooks;
}
