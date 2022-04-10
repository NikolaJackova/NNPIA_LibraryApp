package com.upce.libraryspring.user;

import com.upce.libraryspring.jwt.JwtUserDetails;
import com.upce.libraryspring.user.dto.UserDto;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/users")
public class UserController {
    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping(value = {"", "/"})
    @PreAuthorize("hasAuthority('USER')")
       public List<UserDto> getUsers(){
            JwtUserDetails userDetails =
                    (JwtUserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
            return userService.getUsers();
    }

    @GetMapping(value = "/{id}")
    @PreAuthorize("#id == authentication.principal.id OR hasAuthority('ADMIN')")
    public UserDto getUser(@PathVariable("id") Integer id){
        return userService.getUserById(id);
    }
}
