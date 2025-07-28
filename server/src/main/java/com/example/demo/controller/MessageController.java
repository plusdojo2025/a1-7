package com.example.demo.controller;

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
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.entity.Messages;
import com.example.demo.entity.Partners;
import com.example.demo.repository.MessagesRepository;
import com.example.demo.repository.PartnersRepository;
import com.example.demo.security.services.UserDetailsImpl;

//@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/messages/")
public class MessageController {

	@Autowired
	private MessagesRepository repository;

	@Autowired
	private PartnersRepository partnersRepository;

	// お相手一覧取得
	@GetMapping("/partners/")
	public ResponseEntity<Map<String, Object>> getMap() {
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

	@PostMapping("/ideas/")
	public ResponseEntity<?> submitMessage(@RequestBody Messages messages) {
		// バリデーション処理
		if (messages.getPartnersId() == null || messages.getMood() == null || messages.getMatter() == null) {
			return ResponseEntity.badRequest().body("未選択の項目があります");
		}

		String commandSentence = messages.getCommandSentence();
		String prompt = messages.getPrompt();

		// 命令文とプロンプト生成
//	    String commandSentence = String.format("%sさん宛に、%sな雰囲気で、%sのメッセージを生成してください。",
//	        messages.getPartnersId(), messages.getMood(), messages.getMatter());
//	    String prompt = String.format("相手ID[%s]に対して、ムード[%s]、用件[%s]で送るメッセージを考えてください。",
//	        messages.getPartnersId(), messages.getMood(), messages.getMatter());

		messages.setCommandSentence(commandSentence);
		messages.setPrompt(prompt);

		repository.save(messages);

		// 成功レスポンスとして JSON を返却
		return ResponseEntity.ok(messages);
	}

//	@PostMapping("/messages/ideas/")
//	public String submitMessage(@ModelAttribute Messages messages, Model model) {
//		System.out.println("出力テスト");
////		↓入力チェック
//		if (messages.getPartnersId() == null || messages.getMood() == null || messages.getMatter() == null) {
//			model.addAttribute("errorMessage", "未選択の項目があります");
////			↓フォーム再表示用
//			model.addAttribute("messageIdea", messages);
////			↓処理を止める
//			return "message";
//		}
//
//		
////		直打ちしたければEntityをStringに変換
//				
////		命令文作成
//		String commandSentence = String.format("%dさん宛に、%dな雰囲気で、%dのメッセージを生成してください。", messages.getPartnersId(),
//				messages.getMood(), messages.getMatter());
//
//		messages.setCommandSentence(commandSentence);
//
////		プロンプト作成
//		String prompt = String.format("相手ID[%d]に対して、ムード[%d]、用件[%d]で送るメッセージを考えてください。", messages.getPartnersId(),
//				messages.getMood(), messages.getMatter());
//
//		messages.setPrompt(prompt);
////		結果表示とフォーム再表示
//		model.addAttribute("messageIdea", messages);
//
////		プロンプトを複数表示
//		model.addAttribute("prompts", Arrays.asList(
//			    "こんにちは！今日の気分はどう？",
//			    "趣味の話しませんか？",
//			    "最近ハマってるものは？"
//			));
//
//
//		repository.save(messages);
//		
//		return "message";
//	}

}
