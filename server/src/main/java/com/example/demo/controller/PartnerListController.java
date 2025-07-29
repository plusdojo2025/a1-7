package com.example.demo.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.entity.Partners;
import com.example.demo.entity.Users;
import com.example.demo.repository.PartnersRepository;
import com.example.demo.repository.UsersRepository;
import com.example.demo.security.services.UserDetailsImpl;

@RestController
@RequestMapping("/api/home/")
public class PartnerListController {

	@Autowired
	private PartnersRepository partnerRepository;

	@Autowired
	private UsersRepository userRepository;

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
		List<Partners> partners = partnerRepository.findByUserId(loggedInUserId);

		Map<String, Object> response = new HashMap<>();
		response.put("status", "success");
		response.put("message", "パートナーリストが正常に取得されました。");
		response.put("data", partners);

		return ResponseEntity.ok(response); // 200 OK ステータスとともにJSONを返す
	}

	// お相手を新規登録するメソッド
	@PostMapping("/add/")
	public ResponseEntity<Map<String, Object>> addPartner(@RequestBody Partners partner) {
		Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
		UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();
		Integer loggedInUserId = userDetails.getId();

		// ログインユーザーを取得し、パートナーに紐付ける
		Optional<Users> userOptional = userRepository.findById(loggedInUserId);

		if (userOptional.isEmpty()) {
			// ユーザーが見つからない場合はエラーを返す
			Map<String, Object> errorResponse = new HashMap<>();
			errorResponse.put("status", "error");
			errorResponse.put("message", "ユーザーが見つかりません。");
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(errorResponse);
		}
		partner.setUserId(userOptional.get().getId()); // 取得したユーザーをパートナーにセット

		Partners savedPartner = partnerRepository.save(partner);

		Map<String, Object> response = new HashMap<>();
		response.put("status", "success");
		response.put("message", "お相手を登録しました。");
		response.put("data", savedPartner);

		return ResponseEntity.status(HttpStatus.CREATED).body(response); // 201 Created を返す
	}

	// お相手を削除するメソッド
	@DeleteMapping("/delete/{id}/") // IDをパス変数で受け取る
	public ResponseEntity<Map<String, Object>> deletePartner(@PathVariable Integer id) {
		Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
		UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();
		Integer loggedInUserId = userDetails.getId();

		// 削除対象のパートナーを取得
		Optional<Partners> partnerOptional = partnerRepository.findById(id);

		if (partnerOptional.isEmpty()) {
			Map<String, Object> errorResponse = new HashMap<>();
			errorResponse.put("status", "error");
			errorResponse.put("message", "指定されたお相手が見つかりません。");
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body(errorResponse); // 404 Not Found
		}

		Partners partnerToDelete = partnerOptional.get();

		if (!partnerToDelete.getUserId().equals(loggedInUserId)) { // Assuming Partners has getUsers() method
			Map<String, Object> errorResponse = new HashMap<>();
			errorResponse.put("status", "error");
			errorResponse.put("message", "このお相手を削除する権限がありません。");
			return ResponseEntity.status(HttpStatus.FORBIDDEN).body(errorResponse); // 403 Forbidden
		}

		partnerRepository.delete(partnerToDelete);

		Map<String, Object> response = new HashMap<>();
		response.put("status", "success");
		response.put("message", "お相手を削除しました。");
		return ResponseEntity.ok(response); // 200 OK
	}
}
