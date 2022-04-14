package com.upce.libraryspring.library;

import com.upce.libraryspring.book.BookDto;
import com.upce.libraryspring.jwt.JwtUserDetails;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/libraries")
public class LibraryController {
    private final LibraryService libraryService;

    public LibraryController(LibraryService libraryService) {
        this.libraryService = libraryService;
    }

    @GetMapping(value = {"", "/"})
    public List<LibraryDto> getLibrariesByUserId(Authentication authentication) {
        JwtUserDetails userDetails =
                (JwtUserDetails) authentication.getPrincipal();
        return libraryService.getLibrariesByUserId(userDetails.getId());
    }

    @GetMapping("/{id}")
    public LibraryDto getLibrary(@PathVariable Integer id, Authentication authentication) {
        JwtUserDetails userDetails =
                (JwtUserDetails) authentication.getPrincipal();
        return libraryService.getLibraryByIdAndUserId(id, userDetails.getId());
    }

    @PostMapping(value = {"", "/"})
    public LibraryDto createLibrary(@RequestBody LibraryDto libraryDto, Authentication authentication) {
        JwtUserDetails userDetails =
                (JwtUserDetails) authentication.getPrincipal();
        return libraryService.createLibrary(libraryDto, userDetails.getId());
    }

    @PutMapping("/{id}")
    public LibraryDto updateLibrary(@PathVariable Integer id, @RequestBody LibraryDto libraryDto, Authentication authentication) {
        JwtUserDetails userDetails =
                (JwtUserDetails) authentication.getPrincipal();
        return libraryService.updateLibraryByIdAndUserId(id, libraryDto, userDetails.getId());
    }

    @DeleteMapping("/{id}")
    public void deleteLibrary(@PathVariable Integer id, Authentication authentication) {
        JwtUserDetails userDetails =
                (JwtUserDetails) authentication.getPrincipal();
         libraryService.deleteLibrary(id, userDetails.getId());
    }
}
