package com.example.demo.controller;

import java.beans.PropertyEditorSupport;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.WebDataBinder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.InitBinder;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

import com.example.demo.entity.Partners;
import com.example.demo.repository.PartnersRepository;

@RestController
@RequestMapping("/api/partner/")
public class PartnerDetailController {

	@InitBinder // Date型の空文字をnullに変換するためのバインダ
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

	// お相手情報取得
	@GetMapping("/{id}/")
	public ResponseEntity<Partners> getPartner(@PathVariable("id") Integer id) {
		// isPresent()で存在チェック後、get()で取得
		Partners partner = partnersRepository.findById(id).orElseThrow(
				() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Partner not found with ID: " + id));
		return ResponseEntity.ok(partner); // 200 OK と共にパートナー情報を返す
	}

//	// 編集画面（表示と同時に編集可能）
//	@GetMapping("/{id}/edit/")
//	public String showEditForm(@PathVariable("id") Integer id, Model model) {
//		Partners partner = partnersRepository.findById(id).get();
//		model.addAttribute("partner", partner);
//		return "partneredit";
//	}

	// 更新処理（handleSubmitで呼び出し）
	@PutMapping("/{id}/update/")
	@Transactional
	public ResponseEntity<String> updatePartner(@PathVariable("id") Integer id, @RequestBody Partners formPartner) {
		Optional<Partners> existingPartner = partnersRepository.findById(id);
		if (existingPartner.isEmpty()) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Partner not found with ID: " + id);
        }
		
		formPartner.setId(id); // IDの上書き防止
		
		try {
			partnersRepository.save(formPartner);
			return ResponseEntity.ok("お相手情報を更新しました。");
		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("お相手情報の更新に失敗しました: " + e.getMessage());
		}
	}

//	// 元に戻す（編集前に戻る）
//	@PostMapping("/{id}/reset/")
//	public String resetPartner(@PathVariable("id") Integer id) {
//		return "redirect:/partner/" + id + "/partneredit/";
//	}
}
