package com.example.demo.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.entity.DateSpots;
import com.example.demo.repository.DateSpotsRepository;

@RestController
public class DateSpotController {
	
	@Autowired
	private DateSpotsRepository repository;
	
	@GetMapping("/api/date-spot/")
	public List<DateSpots> getDateSpots() {
	    return repository.findAll();  // 直接JSONで返る
	}
	
	@PostMapping("/api/date-spot/")
	public DateSpots createDateSpot(@RequestBody DateSpots datespot) {
	    return repository.save(datespot);
	}
	
		
}
