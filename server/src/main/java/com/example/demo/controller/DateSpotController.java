package com.example.demo.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;

import com.example.demo.entity.DateSpots;
import com.example.demo.repository.DateSpotsRepository;

@Controller
public class DateSpotController {
	
	@Autowired
	private DateSpotsRepository repository;
	
	@GetMapping("/date/")
	public String date(Model model) {
		List<DateSpots> dateSpot=repository.findAll();
		model.addAttribute("date_plans",dateSpot);
		return "date";
	}
	
	@PostMapping("/date/")
	public String date(@ModelAttribute DateSpots dateplans) {
		repository.save(dateplans);
		return "redirect:/date/";
	}
	
		
}
