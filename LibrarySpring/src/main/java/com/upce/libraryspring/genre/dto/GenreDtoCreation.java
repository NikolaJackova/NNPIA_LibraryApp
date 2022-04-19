package com.upce.libraryspring.genre.dto;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.upce.libraryspring.book.dto.BookDto;

import javax.validation.constraints.NotNull;
import java.util.Set;

public class GenreDtoCreation {
    @NotNull
    private String name;
    private String description;
    @JsonIgnore
    private Set<BookDto> genreBooks;
}
