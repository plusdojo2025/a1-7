package com.example.demo.controller;

import java.beans.PropertyEditorSupport;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.ui.Model;
import org.springframework.web.bind.WebDataBinder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.InitBinder;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import com.example.demo.entity.Partners;
import com.example.demo.repository.PartnersRepository;


@Controller
@RequestMapping("/partner")
public class PartnerDetailController {

	@InitBinder// Date型の空文字をnullに変換するためのバインダ
	public void initBinder(WebDataBinder binder) {
	    SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd");
	    dateFormat.setLenient(false);

	    binder.registerCustomEditor(Date.class, new PropertyEditorSupport() {
	        @Override
	        public void setAsText(String text) throws IllegalArgumentException {
	            if (text == null || text.trim().isEmpty()) {
	                setValue(null);
	            } else {
	                try {
	                    setValue(dateFormat.parse(text));
	                } catch (ParseException e) {
	                    throw new IllegalArgumentException("Invalid date format", e);
	                }
	            }
	        }
	    });
	}
	
	@Autowired
	private PartnersRepository partnersRepository;

	// 編集画面（表示と同時に編集可能）
	@GetMapping("/{id}/partneredit/")
	public String showEditForm(@PathVariable("id") Integer id, Model model) {
		Partners partner = partnersRepository.findById(id).get();
		model.addAttribute("partner", partner);
		return "partneredit";
	}

	// 更新処理
	@PostMapping("/{id}/update/")
	@Transactional
	public String updatePartner(@PathVariable("id") Integer id, @ModelAttribute Partners formPartner,
			RedirectAttributes redirect) {

		formPartner.setId(id); // IDの上書き防止
		partnersRepository.save(formPartner);

		redirect.addFlashAttribute("message", "お相手情報を更新しました。");
		return "redirect:/partner/" + id + "/partneredit/";
	}

	// 元に戻す（編集前に戻る）
	@PostMapping("/{id}/reset/")
	public String resetPartner(@PathVariable("id") Integer id) {
		return "redirect:/partner/" + id + "/partneredit/";
	}
}
