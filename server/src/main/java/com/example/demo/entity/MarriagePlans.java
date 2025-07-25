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
@Table(name="marriage_plans")
public class MarriagePlans {
    @Id
    @GeneratedValue(strategy=GenerationType.IDENTITY)
    private Integer id;

    private Integer usersId;
    private String marriageTiming;
    private Integer marriageYear;
    private Integer marriageMonth;
//    private Integer thisMonth;
    private Integer spanId;
    private Integer span;
    private double percentage;

    private Timestamp createdAt;
    private Timestamp updatedAt;
}
