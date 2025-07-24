package com.example.demo.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.demo.entity.Partners;

@Repository
public interface PartnersRepository extends JpaRepository<Partners, Integer> {
	List<Partners> findByNameContaining(String search);
}
