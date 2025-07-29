package com.example.demo.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.demo.entity.Partners;

@Repository
public interface PartnersRepository extends JpaRepository<Partners, Integer> {
	
	// userIdを外部キーとするお相手レコードを、PartnersEntityから全件取得してリストとして返す
	List<Partners> findByUserId(Integer userId);
	List<Partners> findByUserIdAndNameContaining(Integer userId, String name);
	
}
