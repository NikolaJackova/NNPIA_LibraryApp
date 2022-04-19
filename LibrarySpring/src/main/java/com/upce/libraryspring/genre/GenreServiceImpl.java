package com.upce.libraryspring.genre;

import com.upce.libraryspring.genre.dto.GenreDto;
import com.upce.libraryspring.genre.dto.GenreDtoCreation;
import org.modelmapper.ModelMapper;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class GenreServiceImpl implements GenreService {
    private final ModelMapper modelMapper;
    private final GenreRepository genreRepository;

    public GenreServiceImpl(ModelMapper modelMapper, GenreRepository genreRepository) {
        this.modelMapper = modelMapper;
        this.genreRepository = genreRepository;
    }

    @Override
    public List<GenreDto> getGenres() {
        List<Genre> genres = genreRepository.findAll();
        return genres.stream().map(genre -> modelMapper.map(genre, GenreDto.class)).collect(Collectors.toList());
    }

    @Override
    public GenreDto createGenre(GenreDtoCreation genreDtoCreation) {
        Genre savedGenre = genreRepository.save(modelMapper.map(genreDtoCreation, Genre.class));
        return modelMapper.map(savedGenre, GenreDto.class);
    }

    @Override
    public GenreDto updateGenre(Integer id, GenreDto genreDto) {
        Genre genre = genreRepository.findById(id).orElseThrow(() ->
                new ResponseStatusException(HttpStatus.NOT_FOUND, "Genre with id: " + id + " was not found."));

        genre.setName(genreDto.getName());
        genre.setDescription(genreDto.getDescription());
        Genre updatedGenre = genreRepository.save(genre);
        return modelMapper.map(updatedGenre, GenreDto.class);
    }

    @Override
    public void deleteGenre(Integer id) {
        genreRepository.findById(id).orElseThrow(() ->
                new ResponseStatusException(HttpStatus.NOT_FOUND, "Genre with id: " + id + " was not found."));
        genreRepository.deleteById(id);
    }
}
