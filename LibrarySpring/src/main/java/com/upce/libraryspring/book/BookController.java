package com.upce.libraryspring.book;

import com.upce.libraryspring.book.dto.BookDto;
import com.upce.libraryspring.book.dto.BookDtoCreation;
import com.upce.libraryspring.jwt.JwtUserDetails;
import com.upce.libraryspring.library.dto.LibraryDto;
import com.upce.libraryspring.library.dto.LibraryDtoCreation;
import org.springframework.data.domain.Page;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
public class BookController {
    private final BookService bookService;

    public BookController(BookService bookService) {
        this.bookService = bookService;
    }

    @GetMapping(value = {"/libraries/{libraryId}/books"})
    public Page<BookDto> getBooksByLibraryId(@PathVariable Integer libraryId, Authentication authentication, @RequestParam(defaultValue = "0") Integer pageIndex, @RequestParam(defaultValue = "3") Integer pageSize) {
        JwtUserDetails userDetails =
                (JwtUserDetails) authentication.getPrincipal();
        return bookService.getBooksByLibraryId(libraryId, pageIndex, pageSize, userDetails.getId());
    }

    @PostMapping(value = {"/libraries/{libraryId}/books"})
    public BookDto createBook(@PathVariable Integer libraryId, @RequestBody BookDtoCreation bookDtoCreation, Authentication authentication) {
        JwtUserDetails userDetails =
                (JwtUserDetails) authentication.getPrincipal();
        return bookService.createBook(bookDtoCreation, libraryId, userDetails.getId());
    }
}
