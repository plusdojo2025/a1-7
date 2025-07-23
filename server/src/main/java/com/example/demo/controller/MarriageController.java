package com.example.demo.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;

import com.example.demo.entity.MarriagePlans;
import com.example.demo.repository.MarriagePlansRepository;

@Controller
public class MarriageController {

	@Autowired
	private MarriagePlansRepository repository;
	
	@PostMapping("/marriage_plans/proposal/")
	public String inputMarriageTiming(@ModelAttribute MarriagePlans marriagePlans) {
		System.out.println(marriagePlans);
		repository.save(marriagePlans);
		return "/marriage_plans/proposal/";
	}
	
	@GetMapping("/marriage_plans/")
	public String marriagePlans(Model model) {
		model.addAttribute("message", "こんにちは！");
		return "marriage_plans";
	}
}
