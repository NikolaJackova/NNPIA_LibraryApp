package com.upce.libraryspring.library;

import com.upce.libraryspring.library.dto.LibraryDto;
import com.upce.libraryspring.library.dto.LibraryDtoCreation;
import org.springframework.data.domain.Page;

import java.util.List;

public interface LibraryService {
    Page<LibraryDto> getLibrariesByUserId(Integer id, Integer pageNumber, Integer pageSize);
    LibraryDto getLibraryByIdAndUserId(Integer id, Integer userId);
    LibraryDto createLibrary(LibraryDtoCreation libraryDtoCreation, Integer userId);
    LibraryDto updateLibraryByIdAndUserId(Integer id, LibraryDto libraryDto, Integer userId);
    void deleteLibrary(Integer id, Integer userId);
}
