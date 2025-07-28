package com.example.demo.entity;

import java.sql.Timestamp;
import java.time.LocalDate;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.persistence.Transient;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Data
@Table(name = "marriage_plans")
public class MarriagePlans {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer id;

	private Integer usersId;
	private String marriageTiming;

	@Transient // このフィールドはDBにマッピングしない
	private LocalDate marriageTimingLcD; // JSONからLocalDate型で受け取るフィールド

	private Integer marriageYear;
	private Integer marriageMonth;
//    private Integer thisMonth;
	private Integer spanId;
	private Integer span;
	private double percentage;

	private Timestamp createdAt;
	private Timestamp updatedAt;

	public void setMarriageTimingLcD(LocalDate marriageTimingLcD) {
		this.marriageTimingLcD = marriageTimingLcD;
		// marriageTimingが設定されたら、marriageYearとmarriageMonthも自動設定する
		if (marriageTimingLcD != null) {
			this.marriageYear = marriageTimingLcD.getYear();
			this.marriageMonth = marriageTimingLcD.getMonthValue();
			this.marriageTiming = marriageTimingLcD.toString(); // String型のmarriageTimingも更新
		}
	}
}