package com.example.demo.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.example.demo.entity.LovePhases;
import com.example.demo.repository.LovePhasesRepository;

@Controller
public class PhaseController {

    @Autowired
    private LovePhasesRepository lovePhasesRepository;

   
    @GetMapping("/phases/")
    public String lovePhase(Model model) {
        List<LovePhases> phases = lovePhasesRepository.findAll();
        model.addAttribute("phases", phases);
        model.addAttribute("phase", new LovePhases());
        return "lovephase";
    }

    @PostMapping("/phases/")
    public String saveLovePhase(@ModelAttribute LovePhases phase) {
        lovePhasesRepository.save(phase);
        return "redirect:/phases/";
    }

   
    @GetMapping("/api/love-phases")
    @ResponseBody
    @CrossOrigin(origins = "http://localhost:3000") // Reactからのアクセス許可
    public List<LovePhases> getAllPhasesForReact() {
        return lovePhasesRepository.findAll();
    }
}
