package com.example.demo.entity;

import java.sql.Date;
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
@Table(name="partners")
public class Partners {
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private	Integer	id;
	private	Integer	userId;
	private	String	name;
	private	String	nameRead;
	private	Integer	age;
	private	Date	birthday;
	private	Integer	metEvent;
	private	Date	firstMetDay;
	private	Date	lastMetDay;
	private	String	firstImpression;
	private	Integer	homeSkill;
	private	Integer	economicPower;
	private	Integer	appearance;
	private	Integer	consideration;
	private	Integer	communication;
	private	Integer	contactFreq;
	private	Integer	initiative;
	private	Integer	personality;
	private	Integer	marrigeIntent;
	private	Integer	financialSense;
	private	Integer	smoker;
	private	Integer	alcohol;
	private	Integer	gamble;
	private	Integer	hasChildren;
	private	Integer	transferable;
	private	Integer	driverLicense;
	private	Integer	liveWithParents;
	private	Integer	dualIncome;
	private	Timestamp	createdAt;
	private	Timestamp	updatedAt;


}
