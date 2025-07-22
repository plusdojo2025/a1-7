package com.example.demo.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.demo.entity.LoveEvents;

public interface LoveEventsRepository extends JpaRepository<LoveEvents, Integer> {

}
