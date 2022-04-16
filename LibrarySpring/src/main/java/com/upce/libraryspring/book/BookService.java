package com.upce.libraryspring.book;

import com.upce.libraryspring.book.dto.BookDto;
import com.upce.libraryspring.book.dto.BookDtoCreation;
import org.springframework.data.domain.Page;

public interface BookService {
    Page<BookDto> getBooksByLibraryId(Integer id, Integer pageIndex, Integer pageSize, Integer userId);
    Page<BookDto> getBooksByUserId(Integer id, Integer pageNumber, Integer pageSize);
    BookDto getBookById(Integer id, Integer userId);
    BookDto createBook(BookDtoCreation bookDtoCreation, Integer libraryId, Integer userId);
    BookDto updateBookByIdAndLibraryId(Integer id, BookDto bookDto, Integer libraryId);
    void deleteBook(Integer id, Integer libraryId);
}
