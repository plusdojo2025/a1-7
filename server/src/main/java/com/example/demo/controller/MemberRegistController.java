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
public class MemberRegistController {

	@Autowired
	private UsersRepository repository;

	@PostMapping("/signup/add/")

	public String add(@ModelAttribute Users users) {
		repository.save(users);
		return "redirect:/";

	}

	@GetMapping("/signup/")
	public String signup(Model model) {
		model.addAttribute("message", "こんにちは");
		return "signup";
	}
}