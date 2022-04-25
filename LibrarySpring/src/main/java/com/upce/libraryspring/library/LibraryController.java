package com.upce.libraryspring.library;

import com.upce.libraryspring.jwt.JwtUserDetails;
import com.upce.libraryspring.library.dto.LibraryDto;
import com.upce.libraryspring.library.dto.LibraryDtoCreation;
import org.springframework.data.domain.Page;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/libraries")
@CrossOrigin
public class LibraryController {
    private final LibraryService libraryService;

    public LibraryController(LibraryService libraryService) {
        this.libraryService = libraryService;
    }

    @GetMapping(value = {"", "/"})
    public Page<LibraryDto> getLibrariesByUserId(Authentication authentication, @RequestParam(defaultValue = "0") Integer pageIndex, @RequestParam(defaultValue = "10") Integer pageSize) {
        JwtUserDetails userDetails =
                (JwtUserDetails) authentication.getPrincipal();
        return libraryService.getLibrariesByUserId(userDetails.getId(), pageIndex, pageSize);
    }

    @GetMapping("/{id}")
    public LibraryDto getLibrary(@PathVariable Integer id, Authentication authentication) {
        JwtUserDetails userDetails =
                (JwtUserDetails) authentication.getPrincipal();
        return libraryService.getLibraryByIdAndUserId(id, userDetails.getId());
    }

    @PostMapping(value = {"", "/"})
    public LibraryDto createLibrary(@RequestBody LibraryDtoCreation libraryDtoCreation, Authentication authentication) {
        JwtUserDetails userDetails =
                (JwtUserDetails) authentication.getPrincipal();
        return libraryService.createLibrary(libraryDtoCreation, userDetails.getId());
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
