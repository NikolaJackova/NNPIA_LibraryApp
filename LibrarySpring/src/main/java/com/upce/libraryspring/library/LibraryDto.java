package com.upce.libraryspring.library;

import com.upce.libraryspring.book.BookDto;
import com.upce.libraryspring.user.dto.UserDto;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotNull;
import java.io.Serializable;
import java.util.Set;

@Data
@NoArgsConstructor
public class LibraryDto implements Serializable {
    private Integer id;
    @NotNull
    private String name;
    private String description;
    private LibraryType libraryType;
    private Set<BookDto> libraryBooks;
    private UserDto user;
}
