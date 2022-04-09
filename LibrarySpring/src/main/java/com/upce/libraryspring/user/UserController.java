package com.upce.libraryspring.user;

import com.upce.libraryspring.user.dto.UserDto;
import com.upce.libraryspring.user.dto.UserDtoCreation;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/users")
public class UserController {
    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping(value = {"", "/"})
    public UserDto createPost(@Valid @RequestBody UserDtoCreation userDtoCreation) {
        return userService.createUser(userDtoCreation);
    }

    @GetMapping(value = {"", "/"})
    public List<UserDto> getUsers(){
        return userService.getUsers();
    }

    @GetMapping(value = "/{id}")
    public UserDto getUser(@PathVariable("id") Integer id){
        return userService.getUserById(id);
    }
}
