package com.example.demo.entity;

import java.sql.Timestamp;
import java.util.Date;

import org.springframework.format.annotation.DateTimeFormat;

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
@Table(name = "partners")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Partners {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer id;

	@Column(name = "user_id")
	private Integer userId;

	private String name;

	@Column(name = "name_read")
	private String nameRead;

	private Integer age;

	@DateTimeFormat(pattern = "yyyy-MM-dd")
	private Date birthday;

	@Column(name = "met_event")
	private Integer metEvent;

	@Column(name = "first_met_day")
	@DateTimeFormat(pattern = "yyyy-MM-dd")
	private Date firstMetDay;

	@Column(name = "last_met_day")
	private Date lastMetDay;

	@Column(name = "first_impression")
	private String firstImpression;

	@Column(name = "home_skill")
	private Integer homeSkill;

	@Column(name = "economic_power")
	private Integer economicPower;

	private Integer appearance;
	private Integer consideration;
	private Integer communication;

	@Column(name = "contact_freq")
	private Integer contactFreq;

	private Integer initiative;
	private Integer personality;

	@Column(name = "marriage_intent")
	private Integer marriageIntent;

	@Column(name = "financial_sense")
	private Integer financialSense;

	private Integer smoker;
	private Integer alcohol;
	private Integer gamble;

	@Column(name = "has_children")
	private Integer hasChildren;

	private Integer transferable;

	@Column(name = "driver_license")
	private Integer driverLicense;

	@Column(name = "live_with_parents")
	private Integer liveWithParents;

	@Column(name = "dual_income")
	private Integer dualIncome;

	@Column(name = "created_at")
	private Timestamp createdAt;

	@Column(name = "updated_at")
	private Timestamp updatedAt;
}
