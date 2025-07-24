package com.example.demo.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.entity.Users;
import com.example.demo.repository.UsersRepository;

@RestController
public class MemberRegistController {

	@Autowired
	private UsersRepository repository;

	@PostMapping("/signup/add/")
	// @ModelAttributeで、フロントエンドから送られるURLエンコードされたデータ（キーと値のペア）をオブジェクトにバインド
	// フロントエンド（ReactのAxios）から送信されたJSONデータが自動的にUsersオブジェクトに変換
	public String add(@RequestBody Users users) {
		repository.save(users);
		return "redirect:/login/"; // ログイン画面にリダイレクト
	}

	@GetMapping("/signup/")
	public String signup(Model model) {
		model.addAttribute("message", "こんにちは");
		return "signup";
	}
}