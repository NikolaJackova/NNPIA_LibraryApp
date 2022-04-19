package com.upce.libraryspring.genre.dto;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotNull;
import java.io.Serializable;
import com.upce.libraryspring.book.dto.BookDto;
import java.util.Set;

@Data
@NoArgsConstructor
public class GenreDto implements Serializable {
    private Integer id;
    @NotNull
    private String name;
    private String description;
    @JsonIgnore
    private Set<BookDto> genreBooks;
}
