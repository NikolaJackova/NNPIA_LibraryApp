package com.upce.libraryspring.book;

import com.upce.libraryspring.library.Library;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

public interface BookRepository extends JpaRepository<Book, Integer> {
    Page<Book> findByLibraryId(Integer id, Pageable pageable);
}
