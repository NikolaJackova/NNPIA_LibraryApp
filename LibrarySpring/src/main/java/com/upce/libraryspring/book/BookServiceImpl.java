package com.upce.libraryspring.book;

import com.upce.libraryspring.book.dto.BookDto;
import com.upce.libraryspring.book.dto.BookDtoCreation;
import com.upce.libraryspring.library.Library;
import com.upce.libraryspring.library.LibraryRepository;
import com.upce.libraryspring.library.dto.LibraryDto;
import org.modelmapper.ModelMapper;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

@Service
public class BookServiceImpl implements BookService{
    private final BookRepository bookRepository;
    private final LibraryRepository libraryRepository;
    private final ModelMapper modelMapper;

    public BookServiceImpl(BookRepository bookRepository, LibraryRepository libraryRepository, ModelMapper modelMapper) {
        this.bookRepository = bookRepository;
        this.libraryRepository = libraryRepository;
        this.modelMapper = modelMapper;
    }

    @Override
    public Page<BookDto> getBooksByLibraryId(Integer libraryId, Integer pageIndex, Integer pageSize, Integer userId) {
        Library library = checkAuthorizedUserAndLibrary(libraryId, userId);
        Page<Book> byLibraryId = bookRepository.findByLibraryId(library.getId(), PageRequest.of(pageIndex, pageSize));
        return byLibraryId.map(book -> {
            BookDto bookDto = modelMapper.map(book, BookDto.class);
            return bookDto;
        });
    }

    @Override
    public Page<BookDto> getBooksByUserId(Integer id, Integer pageNumber, Integer pageSize) {
        return null;
    }

    @Override
    public BookDto getBookById(Integer id, Integer userId) {
        Book book = bookRepository.findById(id).orElseThrow(() ->
                new ResponseStatusException(HttpStatus.NOT_FOUND, "Book with id: " + id + " was not found."));
        if (book.getLibrary().getUser().getId() != userId){
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Unauthorized.");
        }
        return modelMapper.map(book, BookDto.class);
    }

    @Override
    public BookDto createBook(BookDtoCreation bookDtoCreation, Integer libraryId, Integer userId) {
        Library library = checkAuthorizedUserAndLibrary(libraryId, userId);
        Book book = modelMapper.map(bookDtoCreation, Book.class);
        book.setLibrary(library);
        Book savedBook = bookRepository.save(book);
        return modelMapper.map(savedBook, BookDto.class);
    }

    @Override
    public BookDto updateBookByIdAndLibraryId(Integer id, BookDto bookDto, Integer libraryId) {
        return null;
    }

    @Override
    public void deleteBook(Integer libraryId, Integer id,  Integer userId) {
        checkAuthorizedUserAndLibrary(libraryId, userId);
        bookRepository.deleteById(id);
    }

    private Library checkAuthorizedUserAndLibrary(Integer libraryId, Integer userId){
        Library library = libraryRepository.findById(libraryId).orElseThrow(() ->
                new ResponseStatusException(HttpStatus.NOT_FOUND, "Library with id: " + libraryId + " was not found."));
        if (library.getUser().getId() != userId){
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Unauthorized.");
        }
        return library;
    }
}
