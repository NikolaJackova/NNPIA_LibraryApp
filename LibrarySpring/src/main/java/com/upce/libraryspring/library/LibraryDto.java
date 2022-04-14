package com.upce.libraryspring.library;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.upce.libraryspring.book.BookDto;
import com.upce.libraryspring.user.dto.UserDto;
import lombok.*;

import javax.validation.constraints.NotNull;
import java.io.Serializable;
import java.util.Set;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@Setter
public class LibraryDto implements Serializable {
    private Integer id;
    @NotNull
    private String name;
    private String description;
    private LibraryType libraryType;
    private Set<BookDto> libraryBooks;
    @JsonIgnore
    private UserDto user;
}
