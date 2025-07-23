package com.example.demo.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.demo.entity.Partners;

public interface PartnersRepository extends JpaRepository<Partners, Integer> {
	List<Partners> findByNameContaining(String search);
}
