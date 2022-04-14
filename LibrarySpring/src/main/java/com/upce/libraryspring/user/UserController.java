package com.upce.libraryspring.user;

import com.upce.libraryspring.user.dto.UserDto;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/users")
@CrossOrigin
public class UserController {
    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    //TODO admin part??
    @GetMapping(value = {"", "/"})
    @PreAuthorize("hasAuthority('ADMIN')")
    public List<UserDto> getUsers() {
        return userService.getUsers();
    }

    @GetMapping(value = "/{username}")
    @PreAuthorize("#username == authentication.principal.username OR hasAuthority('ADMIN')")
    public UserDto getUser(@PathVariable("username") String username) {
        return userService.getUserByUsername(username);
    }

    @PutMapping("/{username}")
    @PreAuthorize("#username == authentication.principal.username")
    public UserDto updateUser(@PathVariable String username, @RequestBody UserDto userDto) {
        return userService.updateUserByUsername(username, userDto);
    }

    @DeleteMapping("/{username}")
    @PreAuthorize("hasAuthority('ADMIN')")
    public void deleteUser(@PathVariable String username) {
        userService.deleteByUsername(username);
    }
}
