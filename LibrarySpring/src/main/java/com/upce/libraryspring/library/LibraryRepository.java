package com.upce.libraryspring.library;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface LibraryRepository extends JpaRepository<Library, Integer> {
    List<Library> findByUserId(Integer id);
}
