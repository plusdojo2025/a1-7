package com.example.demo.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.entity.MarriagePlans;
import com.example.demo.repository.MarriagePlansRepository;

@RestController
public class MarriageController {

	@Autowired
	private MarriagePlansRepository repository;
	
	@PostMapping("/marriage_plans/proposal/")
	public String inputMarriageTiming(@ModelAttribute MarriagePlans marriagePlans) {
		System.out.println(marriagePlans);
//		repository.save(marriagePlans);
		return "/marriage-plans/result/";
	}
	
	@GetMapping("/marriage-plans/")
	public String marriagePlans(Model model) {
//		model.addAttribute("message", "こんにちは！");
		return "marriage-plans";
	}
}
