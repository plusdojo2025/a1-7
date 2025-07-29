package com.example.demo.controller;

import java.sql.Timestamp;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.entity.Partners;
import com.example.demo.repository.PartnersRepository;
import com.example.demo.security.services.UserDetailsImpl;

@RestController
@RequestMapping("/home/")
public class PartnerListController {
	
	@Autowired
	private PartnersRepository repository;
	
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
		List<Partners> partners = repository.findByUserId(loggedInUserId);

		Map<String, Object> response = new HashMap<>();
		response.put("status", "success");
		response.put("message", "パートナーリストが正常に取得されました。");
		response.put("data", partners);
		
		return ResponseEntity.ok(response); // 200 OK ステータスとともにJSONを返す
	}
	
	@GetMapping("/partners/")
	public ResponseEntity<Map<String, Object>> getPartners(
			@RequestParam(required = false) String name) {
		Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
		UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();
		Integer loggedInUserId = userDetails.getId();

	    List<Partners> partners;
	    if (name != null && !name.trim().isEmpty()) {
	        partners = repository.findByUserIdAndNameContaining(loggedInUserId, name);
	    } else {
	        partners = repository.findByUserId(loggedInUserId);
	    }

	    Map<String, Object> response = new HashMap<>();
	    response.put("status", "success");
	    response.put("message", "お相手一覧が正常に取得されました。");
	    response.put("data", partners);

	    return ResponseEntity.ok(response);
	}
	
	
	
	@PostMapping("/add/")
	public ResponseEntity<String> addPartner(@RequestBody Partners partner) {
		
		partner.setName(null);
		partner.setNameRead(null);
		partner.setBirthday(null);
		partner.setAge(null);
		partner.setMetEvent(null);
		partner.setFirstMetDay(null);
		partner.setFirstImpression(null);
		partner.setCreatedAt(new Timestamp(System.currentTimeMillis()));
		partner.setUpdatedAt(new Timestamp(System.currentTimeMillis()));
		
		repository.save(partner);

	    return ResponseEntity.ok("お相手を追加しました。");
	}
	
//	public String partnerlist(@ModelAttribute Partners partners) {
//		partnersRepository.save(partners);
//		return "redirect:/partnerlist/";
//	}
//	
//	@GetMapping("/partners/search")
//	public  Partnerlist(@RequestParam("search") String search, Model model) {
//	    List<Partners> results = partnersRepository.findByNameContaining(search); // 名前に部分一致検索
//	    model.addAttribute("partners", results);
//	    return "partnerlist";
//	}
	
//	@PostMapping("/partnerlist/delete/{id}")
//	public String deletePartner(@PathVariable Integer id) {
//		partnersRepository.deleteById(id);
//	    return "redirect:/partnerlist/";
//	}
}
