package com.example.demo.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;

import com.example.demo.entity.LovePhases;
import com.example.demo.repository.LovePhasesRepository;


@Controller
public class PhaseController {
	
	
	@Autowired
    private LovePhasesRepository repository;
	
	@GetMapping("/phases/")
	public String lovePhase(Model model) {
        model.addAttribute("phase", new LovePhases());
        return "lovephase";  
    }
	
	@PostMapping("/phases/")
    public String lovePhase(@ModelAttribute LovePhases phase) {
        repository.save(phase);
        return "lovephase";  
    }

}
