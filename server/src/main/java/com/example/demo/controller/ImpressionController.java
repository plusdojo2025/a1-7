package com.example.demo.controller;

import java.sql.Timestamp;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
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

	// ↓杉尾さんのやつ
	// 全件またはファイルリング結果を取得
	@GetMapping("/{id}/")
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
	
//	// 絞り込みしたやつ
//	// partnerProfilesIdごとの印象ログ一覧取得（searchTermはオプション）
//    @GetMapping("/{partnerProfilesId}/")
//    public ResponseEntity<List<ImpressionLogs>> getImpressionsByPartner(
//            @PathVariable Integer partnerProfilesId,
//            @RequestParam(required = false) String searchTerm) {
//
//        List<ImpressionLogs> impressions;
//
//        if (searchTerm != null && !searchTerm.trim().isEmpty()) {
//            // partnerProfilesId + 印象文の部分一致検索
//            impressions = repository.findByPartnerProfilesIdAndImpressionContaining(partnerProfilesId, searchTerm);
//        } else {
//            // partnerProfilesIdだけで絞り込み
//            impressions = repository.findByPartnerProfilesId(partnerProfilesId);
//        }
//
//        return ResponseEntity.ok(impressions);
//    }
    
	// 印象
	@PostMapping("/add/")
	public ResponseEntity<String> addImpression(@RequestBody ImpressionLogs impression) {
	    // 日付と印象だけ登録
	    impression.setImageData(null);
	    impression.setMimeType(null);
	    impression.setCreatedAt(new Timestamp(System.currentTimeMillis()));
	    impression.setUpdatedAt(new Timestamp(System.currentTimeMillis()));

	    repository.save(impression);

	    return ResponseEntity.ok("印象記録を登録しました。");
	}

	
}
