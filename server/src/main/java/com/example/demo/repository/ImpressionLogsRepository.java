package com.example.demo.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.demo.entity.ImpressionLogs;

public interface ImpressionLogsRepository extends JpaRepository<ImpressionLogs, Integer> {
	ImpressionLogs findFirstByIdOrderByIdAsc(Integer id);
	void deleteById(Integer id);
}
