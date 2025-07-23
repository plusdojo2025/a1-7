package com.example.demo.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.entity.ImpressionLogs;
import com.example.demo.repository.ImpressionLogsRepository;

@RestController
@RequestMapping("/impressions/") // ベースURL
public class ImpressionController {

	@Autowired
	private ImpressionLogsRepository repository;

	// 全件またはファイルリング結果を取得
	@GetMapping("/{partnerProfilesId}")
	public ResponseEntity<List<ImpressionLogs>> getAllImpressionsOrSearch(
			@RequestParam(required = false) String searchTerm) {
		List<ImpressionLogs> impressions;
		// 検索クエリがある場合、検索メソッドを呼び出す
		if (searchTerm != null && !searchTerm.trim().isEmpty()) {
			impressions = repository.findByImpressionLike(searchTerm);
		} else {
			// 検索クエリがない場合、印象記録を全件取得
			impressions = repository.findAll();
		}
		return ResponseEntity.ok(impressions);
	}
	
	
	
}
