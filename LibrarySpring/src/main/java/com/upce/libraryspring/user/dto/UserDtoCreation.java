package com.upce.libraryspring.user.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.*;
import java.io.Serializable;
import java.sql.Date;

@Data
@NoArgsConstructor
public class UserDtoCreation implements Serializable {
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
    @JsonFormat(pattern="yyyy-MM-dd")
    private Date birthDate;
}
