package com.upce.libraryspring.author;

import com.upce.libraryspring.book.dto.BookDto;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotNull;
import javax.validation.constraints.Past;
import java.io.Serializable;
import java.sql.Date;
import java.util.Set;

@Data
@NoArgsConstructor
public class AuthorDto implements Serializable {
    private Integer id;
    private String firstName;
    @NotNull
    private String lastName;
    @Past(message = "Birth date cannot be in future or present.")
    private Date birthDate;
    private String nationality;
    private Set<BookDto> authorBooks;
}
