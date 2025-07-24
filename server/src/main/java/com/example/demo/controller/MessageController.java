package com.example.demo.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;

import com.example.demo.entity.Messages;
import com.example.demo.repository.MessagesRepository;

@Controller
public class MessageController {

	@Autowired
	private MessagesRepository repository;

	@PostMapping("/messages/ideas/")
	public String submitMessage(@ModelAttribute Messages messages, Model model) {
		System.out.println("出力テスト");
//		入力チェック
		if (messages.getPartnersId() == null || messages.getMood() == null || messages.getMatter() == null) {
			model.addAttribute("errorMessage", "未選択の項目があります");
//			フォーム再表示用
			model.addAttribute("messageIdea", messages);
			return "message";
		}

//		命令文作成
		String commandSentence = String.format("%dさん宛に、%dな雰囲気で、%dのメッセージを生成してください。", messages.getPartnersId(),
				messages.getMood(), messages.getMatter());

		messages.setCommandSentence(commandSentence);

//		プロンプト作成
		String prompt = String.format("相手ID[%d]に対して、ムード[%d]、用件[%d]で送るメッセージを考えてください。", messages.getPartnersId(),
				messages.getMood(), messages.getMatter());

		messages.setPrompt(prompt);
//		結果表示とフォーム再表示
		model.addAttribute("messageIdea", messages);

		repository.save(messages);
		
		return "message";
	}

	@GetMapping("/messages/ideas/")
	public String showMessageForm(Model model) {
		System.out.println("出力テスト");
		model.addAttribute("messageIdea", new Messages());
		return "message";
	}

}
