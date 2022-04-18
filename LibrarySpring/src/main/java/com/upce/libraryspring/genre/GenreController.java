package com.upce.libraryspring.genre;

import com.upce.libraryspring.jwt.JwtUserDetails;
import com.upce.libraryspring.library.dto.LibraryDto;
import org.springframework.data.domain.Page;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/genres")
public class GenreController {
    private final GenreService genreService;

    public GenreController(GenreService genreService) {
        this.genreService = genreService;
    }

    @PreAuthorize("hasAuthority('USER')")
    @GetMapping(value = {"", "/"})
    public List<GenreDto> getGenres() {
        return genreService.getGenres();
    }
}
