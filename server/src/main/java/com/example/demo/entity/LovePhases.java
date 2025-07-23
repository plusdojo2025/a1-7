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
@Table(name="love_phases")
public class LovePhases {
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private	Integer	id;
	private	Integer	usersId;
	private	String	phase;
	private	String	subTitle;
	private	Integer	totalPoint;
	private	Integer	achievementRate;
	private	Integer	phaseStatus;
	private	Timestamp	createdAt;
	private	Timestamp	updatedAt;

}
