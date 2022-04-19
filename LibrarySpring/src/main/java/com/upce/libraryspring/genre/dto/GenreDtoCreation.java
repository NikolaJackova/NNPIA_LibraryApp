package com.upce.libraryspring.genre.dto;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.upce.libraryspring.book.dto.BookDto;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.validation.constraints.NotNull;
import java.io.Serializable;
import java.util.Set;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class GenreDtoCreation implements Serializable {
    @NotNull
    private String name;
    private String description;
    @JsonIgnore
    private Set<BookDto> genreBooks;
}
