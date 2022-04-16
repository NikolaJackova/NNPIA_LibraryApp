package com.upce.libraryspring.library.dto;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.upce.libraryspring.library.LibraryType;
import com.upce.libraryspring.user.dto.UserDto;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.validation.constraints.NotNull;

@Getter
@Setter
@NoArgsConstructor
public class LibraryDtoCreation {
    @NotNull
    private String name;
    private String description;
    private LibraryType libraryType;
    @JsonIgnore
    private UserDto user;
}
