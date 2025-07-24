package com.example.demo.controller;

import java.time.LocalDate;
import java.time.temporal.ChronoUnit;

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
	
	@PostMapping("/marriage-plans/result/")
	public String showResult(@ModelAttribute MarriagePlans marriagePlans, Model model) {
//		marriagePlansの中身を確認
		System.out.println(marriagePlans);

//		repository.save(marriagePlans);
		long span = 0;
		String percentage = "85";
		String errorMessage = null;
		
//		未入力エラーチェック できてないです
		int checkYear = marriagePlans.getMarriageYear();
		int checkMonth = marriagePlans.getMarriageMonth();
 		if (checkYear == 0 || checkMonth == 0) {
			errorMessage = "結婚希望時期を入力してください";
		}
 		
// 		半年後エラーチェック1 	
 		LocalDate inputDate = LocalDate.of(checkYear, checkMonth ,1);
		LocalDate today = LocalDate.now();
//		LocalDate sixMonthsLater = today.plusMonths(6);
		
		span = ChronoUnit.MONTHS.between(today, inputDate);
		
        if (span >= 6) {
            System.out.println("入力は半年後以降です ✅");
        } else {
            System.out.println("入力は半年以内です ❌");
            return "marriagePlan";
        }

//        if (!inputDate.isBefore(sixMonthsLater)) {
//            System.out.println("入力は半年後以降です ✅");
//        } else {
//            System.out.println("入力は半年以内です ❌");
//        }

		
//		String check = marriagePlans.getMarriageTiming();
//		if (check == "") {
//			errorMessage = "結婚希望時期を入力してください";
//		}
//		else if (check - today < 182) {
//			errorMessage = "半年以降で入力してください";
//		}
		
//		model.addAttribute("marriageTiming", marriagePlans.getMarriageTiming());
		
		model.addAttribute("marriageYear", marriagePlans.getMarriageYear());
		model.addAttribute("marriageMonth", marriagePlans.getMarriageMonth());
		
//		span = ChronoUnit.MONTHS.between(today, inputDate);			
	    model.addAttribute("span", span);
	    
//	    割合はこちらで計算
//	    model.addAttribute("percentage", percentage);
	    model.addAttribute("errorMessage", errorMessage);
		
	    System.out.println("出力確認");
		return "marriageResult";
	}
	
	@GetMapping("/marriage-plans/")
	public String marriagePlans(Model model) {
//		model.addAttribute("message", "こんにちは！");
		model.addAttribute("marriagePlans", new MarriagePlans());
		return "marriagePlan";
	}
}
