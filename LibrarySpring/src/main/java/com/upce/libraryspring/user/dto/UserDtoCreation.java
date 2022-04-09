package com.upce.libraryspring.user.dto;

import com.upce.libraryspring.library.LibraryDto;
import com.upce.libraryspring.role.RoleDto;
import lombok.Data;
import org.springframework.format.annotation.DateTimeFormat;

import javax.validation.constraints.*;
import java.io.Serializable;
import java.sql.Date;
import java.sql.Time;
import java.sql.Timestamp;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.Set;

@Data
public class UserDtoCreation implements Serializable {
    private final Integer id;
    @NotNull
    @NotBlank
    private final String username;
    @NotNull
    @Pattern(regexp = "(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z]).{8,32}")
    private final String password;
    @NotNull
    @Email
    private final String email;
    @Past(message = "Birth date cannot be in future or present.")
    private final Date birthDate;
    private final Timestamp creationDate = Timestamp.valueOf(LocalDateTime.now());
    private final Set<LibraryDto> userLibraries;
    private final Set<RoleDto> userRoles;
}
