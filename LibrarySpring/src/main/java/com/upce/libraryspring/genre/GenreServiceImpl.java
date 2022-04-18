package com.upce.libraryspring.genre;

import com.upce.libraryspring.library.Library;
import com.upce.libraryspring.library.dto.LibraryDto;
import com.upce.libraryspring.user.dto.UserDto;
import org.modelmapper.ModelMapper;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class GenreServiceImpl implements GenreService{
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
}
