package com.upce.libraryspring.user.dto;

import com.upce.libraryspring.library.LibraryDto;
import com.upce.libraryspring.role.RoleDto;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.format.annotation.DateTimeFormat;

import javax.validation.constraints.*;
import java.io.Serializable;
import java.sql.Date;
import java.sql.Time;
import java.sql.Timestamp;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.HashSet;
import java.util.Set;

@Data
@NoArgsConstructor
public class UserDtoCreation implements Serializable {
    private Integer id;
    @NotNull
    @NotBlank
    private String username;
    @NotNull
    @Pattern(regexp = "(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z]).{8,32}")
    private String password;
    @NotNull
    @Email
    private String email;
    @Past(message = "Birth date cannot be in future or present.")
    private Date birthDate;
}
