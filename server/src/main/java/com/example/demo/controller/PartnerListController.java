package com.example.demo.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.entity.Partners;
import com.example.demo.repository.PartnersRepository;
import com.example.demo.security.services.UserDetailsImpl;

@RestController
@RequestMapping("/api/home/")
public class PartnerListController {
	
//	@Autowired
//	private UsersRepository usersRepository;
	
	@Autowired
	private PartnersRepository partnersRepository;
	
	// お相手一覧表示
	@GetMapping("/showView/")
	public ResponseEntity<Map<String, Object>> showView() {
		// 1. 現在認証されているユーザーの情報を取得
		Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

		// 認証プリンシパルからUserDetailsImplオブジェクトを取得
		UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();
		
		// UserDetailsImpl からログインユーザーのIDを取得
		Integer loggedInUserId = userDetails.getId();
		
		// 2. ログインユーザーのIDに紐づくパートナーのみを取得
		List<Partners> partners = partnersRepository.findByUserId(loggedInUserId);

		Map<String, Object> response = new HashMap<>();
		response.put("status", "success");
		response.put("message", "パートナーリストが正常に取得されました。");
		response.put("data", partners);
		
		return ResponseEntity.ok(response); // 200 OK ステータスとともにJSONを返す
	}
	
//	@PostMapping("/partnerlist/")
//	public String partnerlist(@ModelAttribute Partners partners) {
//		partnersRepository.save(partners);
//		return "redirect:/partnerlist/";
//	}
//	
//	@GetMapping("/partnerlist/search")
//	public String Partnerlist(@RequestParam("search") String search, Model model) {
//	    List<Partners> results = partnersRepository.findByNameContaining(search); // 名前に部分一致検索
//	    model.addAttribute("partners", results);
//	    return "partnerlist";
//	}
//	
//	@PostMapping("/partnerlist/delete/{id}")
//	public String deletePartner(@PathVariable Integer id) {
//		partnersRepository.deleteById(id);
//	    return "redirect:/partnerlist/";
//	}
}
