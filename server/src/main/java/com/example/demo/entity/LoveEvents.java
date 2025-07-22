package com.example.demo.entity;

import java.sql.Timestamp;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Data
@Table(name="love_events")
public class LoveEvents {
	
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private	Integer id;
	
	private	Integer phaseId;
	private	Integer endCheck;
	private	Integer eventType;
	private	String event;
	private	Integer point;
	private	Timestamp createdAt;
	private	Timestamp updatedAt;

}
