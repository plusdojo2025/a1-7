package com.example.demo.entity;

import java.sql.Date;
import java.sql.Timestamp;

import jakarta.persistence.Column;
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
@Table(name = "users")
public class Users {

	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private Integer id;
	@Column(unique = true)
	private String mailAddress;
	private String password;
	private Date birthday;
	private Date marriageStart;
	private String name;
	private Date marriageTiming;
	private Integer homeSkill;
	private Integer economicPower;
	private Integer appearance;
	private Integer communication;
	private Integer consideration;
	private Integer childWish;
	private Integer liveWithParents;
	private Integer dualIncome;
	private Integer idealHeight;
	private Integer idealIncome;
	private Integer idealSeducation;
	private Integer idealAgeDifference;
	private String idealHomeArea;
	private Integer idealHousingType;
	private String idealJob;
	private Integer idealHomeSkill;
	private Integer idealEconomicPower;
	private Integer idealAppearance;
	private Integer idealConsideration;
	private Integer idealCommunication;
	private Integer idealContactFreq;
	private Integer idealInitiative;
	private Integer ideaPpersonality;
	private Integer idealMarriageIntent;
	private Integer idealFinancialSense;
	private Integer idealSmoker;
	private Integer idealAlcohol;
	private Integer idealGamble;
	private Integer idealHasChildren;
	private Integer idealTransferable;
	private Integer idealDriverLicense;
	private Integer idealHasDivorce;
	private Timestamp createdAt;
	private Timestamp updatedAt;

}
