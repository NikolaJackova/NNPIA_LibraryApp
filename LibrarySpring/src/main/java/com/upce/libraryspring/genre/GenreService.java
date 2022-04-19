package com.upce.libraryspring.genre;

import com.upce.libraryspring.genre.dto.GenreDto;
import com.upce.libraryspring.genre.dto.GenreDtoCreation;

import java.util.List;

public interface GenreService {
    List<GenreDto> getGenres();
    GenreDto createGenre(GenreDtoCreation genreDtoCreation);
    GenreDto updateGenre(Integer id, GenreDto genreDto);
    void deleteGenre(Integer id);
}
