package com.example.demo.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.entity.Users;
import com.example.demo.repository.UsersRepository;

@RestController
public class LoginController {
	
	@Autowired
	private UsersRepository repository;

	@GetMapping("/login/")
	public String login(Model model) {
		List<Users> users=repository.findAll();
		model.addAttribute("users",users);
		return "login";
}
	@PostMapping("/home/")
	public String login(@ModelAttribute Users users) {
		repository.save(users);
		return "home";
				
	}
	
	}
