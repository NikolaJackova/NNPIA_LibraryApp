package com.upce.libraryspring.library;

import java.util.List;

public interface LibraryService {
    List<LibraryDto> getLibrariesByUserId(Integer id);
    LibraryDto getLibraryById(Integer id);
    LibraryDto createLibrary(LibraryDto libraryDto, Integer userId);
    LibraryDto updateLibraryById(Integer id, LibraryDto libraryDto);
    void deleteLibrary(Integer id);
}
