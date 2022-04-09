package com.upce.libraryspring.user;

import com.upce.libraryspring.user.dto.UserDto;
import com.upce.libraryspring.user.dto.UserDtoCreation;

import java.util.List;

public interface UserService {
    UserDto createUser(UserDtoCreation userDtoCreation);
    List<UserDto> getUsers();
    UserDto getUserById(Integer id);
}
