package com.example.demo.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.demo.entity.ImpressionLogs;

@Repository
public interface ImpressionLogsRepository extends JpaRepository<ImpressionLogs, Integer> {
	
	// お相手の印象記録を全件取得
	List<ImpressionLogs> findByPartnerProfilesIdOrderByRecordDateDesc(Integer partnerProfilesId);
	
	// 印象内容で部分一致検索(大文字小文字を区別しない)
	List<ImpressionLogs> findByImpressionLike(String impression);
	
	List<ImpressionLogs> findByPartnerProfilesId(Integer partnerProfilesId);

    List<ImpressionLogs> findByPartnerProfilesIdAndImpressionContaining(Integer partnerProfilesId, String impression);

}
