package com.example.demo.controller;

import java.sql.Timestamp;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.entity.ImpressionLogs;
import com.example.demo.entity.Partners;
import com.example.demo.repository.ImpressionLogsRepository;
import com.example.demo.repository.PartnersRepository;
import com.example.demo.security.services.UserDetailsImpl;

@RestController
@RequestMapping("/api/impressions/") // ベースURL
public class ImpressionController {

	@Autowired
	private PartnersRepository partnerRepository;

	@Autowired
	private ImpressionLogsRepository impressionLogsRepository;

	// 全件またはファイルリング結果を取得
	@GetMapping("/{partnerId}/") // IDをパス変数で受け取る
	public ResponseEntity<List<ImpressionLogs>> getImpressionsByPartner(
			@PathVariable Integer partnerId, // パス変数としてお相手Idを受け取る
			@RequestParam(required = false) String searchTerm) {
		
		// 認証済みユーザーのIDを取得
		Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
		UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();
		Integer loggedInUserId = userDetails.getId();
		
		// 指定されたパートナーIDが認証済みユーザーに紐づいているかを確認
		Optional<Partners> partnerOptional = partnerRepository.findById(partnerId);
		if (partnerOptional.isEmpty() || !partnerOptional.get().getUserId().equals(loggedInUserId)) {
			// パートナーが見つからないか、認証済みユーザーのパートナーではない場合
			return ResponseEntity.status(HttpStatus.FORBIDDEN).build(); // 403 Forbidden
		}
		
		List<ImpressionLogs> impressions;
		// 検索クエリがある場合、検索メソッドを呼び出す
		if (searchTerm != null && !searchTerm.trim().isEmpty()) {
			impressions = impressionLogsRepository.findByImpressionLike(searchTerm);
		} else {
			// 検索クエリがない場合、印象記録を全件取得
			impressions = impressionLogsRepository.findByPartnerProfilesId(partnerId);
		}
		return ResponseEntity.ok(impressions);
	}

	// 印象ログの新規追加
	@PostMapping("/add/")
	public ResponseEntity<String> addImpression(@RequestBody ImpressionLogs impression) {
		// 日付と印象だけ登録
		impression.setImageData(null);
		impression.setMimeType(null);
		impression.setCreatedAt(new Timestamp(System.currentTimeMillis()));
		impression.setUpdatedAt(new Timestamp(System.currentTimeMillis()));

		impressionLogsRepository.save(impression);

		return ResponseEntity.ok("印象記録を登録しました。");
	}

}
