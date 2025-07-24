package com.example.demo.controller;

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
public class MemberRegistController {

	@Autowired
	private UsersRepository repository;

	// Reactでルートページを扱っているため、Thymeleafテンプレートを返す@GetMapping("/signup/") メソッドは不要

	@PostMapping("/signup/add/")
	public ResponseEntity<String> add(@RequestBody Users users) {
		try {
			// 1. メールアドレスの重複チェック
			Optional<Users> existingUser = repository.findByMailAddress(users.getMailAddress());
			if (existingUser.isPresent()) {
				return ResponseEntity.status(HttpStatus.CONFLICT).body("このメールアドレスは既に登録されています。");
			}
			// 2. 重複がなければユーザー登録を実行
			repository.save(users);
			return ResponseEntity.ok("");
		} catch (Exception e) {
			// その他の予期せぬエラーが発生した場合
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("ユーザー登録に失敗しました: " + e.getMessage());
		}
	}
}