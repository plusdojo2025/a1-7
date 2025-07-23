package com.example.demo.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;

import com.example.demo.entity.DatePlans;
import com.example.demo.repository.DatePlansRepository;

@Controller
public class DateController {
	
	@Autowired
	private DatePlansRepository repository;
	
	@GetMapping("/date/")
	public String date(Model model) {
		List<DatePlans> datePlans=repository.findAll();
		model.addAttribute("date_plans",datePlans);
		return "date";
	}
	
	@PostMapping("/date/")
	public String date(@ModelAttribute DatePlans dateplans) {
		repository.save(dateplans);
		return "redirect:/date/";
	}
	
		
}
