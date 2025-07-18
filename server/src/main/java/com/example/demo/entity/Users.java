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
@Table(name = "users")
public class Users {

	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private Integer Id;
	private String mail_address;
	private String password;
	private Date birthday;
	private Date marriage_start;
	private String name;
	private Date marriage_timing;
	private Integer home_skill;
	private Integer economic_power;
	private Integer appearance;
	private Integer communication;
	private Integer consideration;
	private Integer child_wish;
	private Integer live_with_parents;
	private Integer dual_income;
	private Integer ideal_height;
	private Integer ideal_income;
	private Integer ideal_seducation;
	private Integer ideal_age_difference;
	private String ideal_home_area;
	private Integer ideal_housing_type;
	private String ideal_job;
	private Integer ideal_home_skill;
	private Integer ideal_economic_power;
	private Integer ideal_appearance;
	private Integer ideal_consideration;
	private Integer ideal_communication;
	private Integer ideal_contact_freq;
	private Integer ideal_initiative;
	private Integer ideal_personality;
	private Integer ideal_marriage_intent;
	private Integer ideal_financial_sense;
	private Integer ideal_smoker;
	private Integer ideal_alcohol;
	private Integer ideal_gamble;
	private Integer ideal_has_children;
	private Integer ideal_transferable;
	private Integer ideal_driver_license;
	private Integer ideal_has_divorce;
	private Timestamp created_at;
	private Timestamp updated_at;

}
