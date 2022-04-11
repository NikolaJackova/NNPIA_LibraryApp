package com.upce.libraryspring.user;

import com.upce.libraryspring.user.dto.UserDto;

import java.util.List;

public interface UserService {
    List<UserDto> getUsers();
    UserDto getUserById(Integer id);
    UserDto getUserByUsername(String username);
    UserDto updateUserByUsername(String username, UserDto userDto);
    void deleteByUsername(String username);
}
