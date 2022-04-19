package com.upce.libraryspring.genre;

import com.upce.libraryspring.genre.dto.GenreDto;
import com.upce.libraryspring.genre.dto.GenreDtoCreation;
import com.upce.libraryspring.jwt.JwtUserDetails;
import com.upce.libraryspring.library.dto.LibraryDto;
import com.upce.libraryspring.library.dto.LibraryDtoCreation;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

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

    @PreAuthorize("hasAuthority('ADMIN')")
    @PostMapping(value = {"", "/"})
    public GenreDto createGenre(@RequestBody GenreDtoCreation genreDtoCreation) {
        return genreService.createGenre(genreDtoCreation);
    }

    @PreAuthorize("hasAuthority('ADMIN')")
    @PutMapping("/{id}")
    public GenreDto updateGenre(@PathVariable Integer id, @RequestBody GenreDto genreDto) {
        return genreService.updateGenre(id, genreDto);
    }

    @PreAuthorize("hasAuthority('ADMIN')")
    @DeleteMapping("/{id}")
    public void deleteLibrary(@PathVariable Integer id) {
        genreService.deleteGenre(id);
    }
}
