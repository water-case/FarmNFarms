package com.ssafy.domain.imgae;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Optional;

public interface ImageRepository extends JpaRepository<Image, Long> {

    @Query(value = "SELECT * FROM IMAGE i WHERE i.id = (CASE  WHEN :id IN (SELECT i.id FROM IMAGE i) THEN :id ELSE 1 END)" , nativeQuery = true)
    public Optional<Image> findById(@Param("id") Long id);

}