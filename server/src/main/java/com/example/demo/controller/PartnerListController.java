package com.example.demo.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;

import com.example.demo.entity.Partners;
import com.example.demo.repository.PartnersRepository;

@Controller
public class PartnerListController {
	
	@Autowired
	private PartnersRepository repository;
	
	@GetMapping("/partnerlist/")
	public String partnerlist(Model model) {
		List<Partners> partners=repository.findAll();
		model.addAttribute("partners",partners);
		return "partnerlist";
	}
	
	@PostMapping("/partnerlist/")
	public String partnerlist(@ModelAttribute Partners partners) {
		repository.save(partners);
		return "redirect:/partnerlist/";
	}
	
	@GetMapping("/partnerlist/search")
	public String Partnerlist(@RequestParam("search") String search, Model model) {
	    List<Partners> results = repository.findByNameContaining(search); // 名前に部分一致検索
	    model.addAttribute("partners", results);
	    return "partnerlist";
	}
	
	@PostMapping("/partnerlist/delete/{id}")
	public String deletePartner(@PathVariable Integer id) {
	    repository.deleteById(id);
	    return "redirect:/partnerlist/";
	}
}
