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
@Table(name="date_plans")
public class DatePlans {
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private	Integer	id;
	private	String	questionId;
	private	String	question;
	private	String	yesNextId;
	private	String	noNextId;
	private	String	prevId;
	private	String	conclusion;
	private	Timestamp	createdAt;
	private	Timestamp	updatedAt;

}
