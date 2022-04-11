package com.upce.libraryspring.library;

import com.upce.libraryspring.jwt.JwtUserDetails;
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
    public List<LibraryDto> getLibrariesByUserId() {
        JwtUserDetails userDetails =
                (JwtUserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        return libraryService.getLibrariesByUserId(userDetails.getId());
    }

    @GetMapping("/{id}")
    public LibraryDto getLibrary(@PathVariable Integer id) {
        return null;
    }

    @PostMapping(value = {"", "/"})
    public LibraryDto createLibrary(@RequestBody LibraryDto libraryDto) {
        JwtUserDetails userDetails =
                (JwtUserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        return libraryService.createLibrary(libraryDto, userDetails.getId());
    }

    @PutMapping("/{id}")
    public LibraryDto updateLibrary(@PathVariable Integer id, @RequestBody LibraryDto libraryDto) {
        return libraryService.updateLibraryById(id, libraryDto);
    }

    @DeleteMapping("/{id}")
    public void deleteLibrary(@PathVariable Integer id) {
        libraryService.deleteLibrary(id);
    }
}
