package com.upce.libraryspring.library;

import com.upce.libraryspring.library.dto.LibraryDto;
import com.upce.libraryspring.library.dto.LibraryDtoCreation;
import com.upce.libraryspring.user.UserRepository;
import org.modelmapper.ModelMapper;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class LibraryServiceImpl implements LibraryService{
    private final LibraryRepository libraryRepository;
    private final ModelMapper modelMapper;
    private final UserRepository userRepository;

    public LibraryServiceImpl(LibraryRepository libraryRepository, ModelMapper modelMapper, UserRepository userRepository) {
        this.libraryRepository = libraryRepository;
        this.modelMapper = modelMapper;
        this.userRepository = userRepository;
    }

    @Override
    public Page<LibraryDto> getLibrariesByUserId(Integer id, Integer pageIndex, Integer pageSize) {
        Page<Library> byUserId = libraryRepository.findByUserId(id, PageRequest.of(pageIndex, pageSize));
        return byUserId.map(library -> {
            LibraryDto libraryDto = modelMapper.map(library, LibraryDto.class);
            return libraryDto;
        });
    }

    @Override
    public LibraryDto getLibraryByIdAndUserId(Integer id, Integer userId) {
        Library library = libraryRepository.findById(id).orElseThrow(() ->
                new ResponseStatusException(HttpStatus.NOT_FOUND, "Library with id: " + id + " was not found."));
        if (library.getUser().getId() != userId){
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Unauthorized.");
        }
        return modelMapper.map(library, LibraryDto.class);
    }

    @Override
    public LibraryDto createLibrary(LibraryDtoCreation libraryDtoCreation, Integer userId) {
        Library library = modelMapper.map(libraryDtoCreation, Library.class);
        library.setUser(userRepository.findById(userId).orElseThrow(() ->
                new ResponseStatusException(HttpStatus.NOT_FOUND, "User with id: " + userId + " was not found.")));
        Library savedLibrary = libraryRepository.save(library);
        return modelMapper.map(savedLibrary, LibraryDto.class);
    }

    @Override
    public LibraryDto updateLibraryByIdAndUserId(Integer id, LibraryDto libraryDto, Integer userId) {
        Library library = libraryRepository.findById(id).orElseThrow(() ->
                new ResponseStatusException(HttpStatus.NOT_FOUND, "Library with id: " + id + " was not found."));
        if (library.getUser().getId() != userId){
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Unauthorized.");
        }
        library.setName(libraryDto.getName());
        library.setDescription(libraryDto.getDescription());
        library.setLibraryType(libraryDto.getLibraryType());
        Library savedLibrary = libraryRepository.save(library);
        return modelMapper.map(savedLibrary, LibraryDto.class);
    }

    @Override
    public void deleteLibrary(Integer id, Integer userId) {
        Library library = libraryRepository.findById(id).orElseThrow(() ->
                new ResponseStatusException(HttpStatus.NOT_FOUND, "Library with id: " + id + " was not found."));
        if (library.getUser().getId() != userId){
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Unauthorized.");
        }
        libraryRepository.deleteById(id);
    }
}
