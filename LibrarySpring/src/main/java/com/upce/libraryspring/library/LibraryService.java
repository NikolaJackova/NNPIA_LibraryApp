package com.upce.libraryspring.library;

import java.util.List;

public interface LibraryService {
    List<LibraryDto> getLibrariesByUserId(Integer id);
    LibraryDto getLibraryByIdAndUserId(Integer id, Integer userId);
    LibraryDto createLibrary(LibraryDto libraryDto, Integer userId);
    LibraryDto updateLibraryByIdAndUserId(Integer id, LibraryDto libraryDto, Integer userId);
    void deleteLibrary(Integer id, Integer userId);
}
