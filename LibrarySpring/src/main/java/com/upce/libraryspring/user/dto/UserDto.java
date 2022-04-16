package com.upce.libraryspring.user.dto;

import com.upce.libraryspring.library.dto.LibraryDto;
import com.upce.libraryspring.role.RoleDto;
import lombok.*;

import javax.validation.constraints.*;
import java.io.Serializable;
import java.sql.Date;
import java.util.Set;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@Setter
public class UserDto implements Serializable {
    private Integer id;
    @NotNull
    @NotBlank
    private String username;
    @Email
    @NotNull
    private String email;
    @Past(message = "Birth date cannot be in future or present.")
    private Date birthDate;
    private Set<RoleDto> userRoles;
    private Set<LibraryDto> userLibraries;
}
