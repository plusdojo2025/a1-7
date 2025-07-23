package com.example.demo.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.demo.entity.Messages;

public interface MessagesRepository extends JpaRepository<Messages, Integer> {

}
