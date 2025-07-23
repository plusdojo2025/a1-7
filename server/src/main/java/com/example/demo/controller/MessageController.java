package com.example.demo.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.repository.MessagesRepository;

@RestController
public class MessageController {
	
	@Autowired
	private MessagesRepository repository; 
	
	@PostMapping
	public String newMessageProposal () {
		System.out.println("テスト");
		
		return "";
	}
	
	@GetMapping
	public String messageProposal () {
		System.out.println("テスト");
		
		return "";
	}
	
	
}
