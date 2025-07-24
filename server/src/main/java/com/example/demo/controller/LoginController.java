package com.example.demo.controller;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.entity.Users;
import com.example.demo.repository.UsersRepository;

@RestController
public class LoginController {

	@Autowired
	private UsersRepository repository;

	@PostMapping("/login/")
	public ResponseEntity<Map<String, String>> login(@RequestBody Users loginRequest) {
		Map<String, String> responseBody = new HashMap<>(); // レスポンスボディ用のMap

		// 1. メールアドレスでユーザーを検索
		Optional<Users> existingUserOptional = repository.findByMailAddress(loginRequest.getMailAddress());
		if (existingUserOptional.isEmpty()) {
			responseBody.put("message", "メールアドレスまたはパスワードが間違っています。");
			return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(responseBody);
		}
		Users existingUser = existingUserOptional.get();

		// 2. パスワードチェック
		if (existingUser.getPassword().equals(loginRequest.getPassword())) {
			// ログイン成功
			responseBody.put("message", "Login successful!");
			responseBody.put("userId", String.valueOf(existingUser.getId())); // ReactにユーザーIDを返す
			return ResponseEntity.ok(responseBody);
		} else {
			// パスワード不一致
			responseBody.put("message", "メールアドレスまたはパスワードが間違っています。");
			return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(responseBody);
		}
	}
}
