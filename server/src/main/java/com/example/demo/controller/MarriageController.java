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
//		婚活スピード変化用
//		String percentage = "85";
		String errorMessage = null;
		
		int checkYear = marriagePlans.getMarriageYear();
		int checkMonth = marriagePlans.getMarriageMonth();
 		
// 		半年後エラーチェック
 		LocalDate inputDate = LocalDate.of(checkYear, checkMonth ,1);
		LocalDate today = LocalDate.now();
		
		span = ChronoUnit.MONTHS.between(today, inputDate) + 1;
		
        if (span >= 6) {
            System.out.println("入力は半年後以降です ✅");
        } else {
            System.out.println("入力は半年以内です ❌");
//            エラーメッセージ追加
            model.addAttribute("errorMessage", "半年以降で入力してください");
            return "marriagePlan";
        }
		
//      結婚希望時期を設定
		model.addAttribute("marriageYear", marriagePlans.getMarriageYear());
		model.addAttribute("marriageMonth", marriagePlans.getMarriageMonth());
		
//		婚活を提案した年と月を設定
		long thisYear = LocalDate.now().getYear();
        long thisMonth = LocalDate.now().getMonthValue();
        model.addAttribute("thisYear", thisYear);
		model.addAttribute("thisMonth", thisMonth);
		
//		婚活残り期間
		long remainingMonths = span;
		System.out.println(remainingMonths);
		int totalPhases = 5;  //残りフェーズ数
		long remainder = span % 5; // 端数がある場合の調整
		
//		Phaseの比重 固定
//		double weight = 0.2;	
//		Phaseの比重 可変
		double[] phaseWeights = {0.1, 0.2, 0.2, 0.4, 0.1};
		
		for(int i = 0; i < totalPhases; i++) {
//			流れi
			double result = (thisMonth + span * phaseWeights[i]); 
			long phaseMonth = (long) (result);
			System.out.println(i + "流れ：" + phaseMonth);
			
//			端数がある場合の調整
			if (remainder != 0 && i == 3) {
				phaseMonth += remainder;
			}
//			年をまたいでいるかの確認
			while (phaseMonth > 12) {
				phaseMonth -= 12;
				thisYear += 1;
			}			
//			結婚時期微調整
			if (i == 4 && checkMonth != phaseMonth) {
				thisYear = checkYear;
				phaseMonth = checkMonth;
			}
			
//			値を格納
			model.addAttribute("marriagePhase" + (i + 1), phaseMonth);	
			model.addAttribute("thisYear" + (i + 1), thisYear);
//			残り期間の計算
			remainingMonths -= (long) (result - thisMonth);
			System.out.println("残り期間：" + remainingMonths);
			thisMonth = phaseMonth;	
		}
		
//		婚活期間を格納
	    model.addAttribute("span", span);
	    
//	    エラーメッセージ表示エリア
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
