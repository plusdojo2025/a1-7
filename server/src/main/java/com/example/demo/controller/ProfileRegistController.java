package com.example.demo.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;

import com.example.demo.entity.Users;
import com.example.demo.repository.UsersRepository;

@Controller
public class ProfileRegistController {
	
	@Autowired
	private UsersRepository repository;
	
	@GetMapping("/home/userRegist")
	public String userProfileRegist(Model model) {
		model.addAttribute("user", new Users()); 
        return "profileRegister";
	}
	
	@PostMapping("/home/userRegist")
	public String userProfileRegist(@ModelAttribute Users users) {
		repository.save(users);
		return "redirect:/home";
	}
	


}
