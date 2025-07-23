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
@Table(name="impression_logs")
public class ImpressionLogs {
    @Id
    @GeneratedValue(strategy=GenerationType.IDENTITY)
    private Integer id;

    private Integer partnerProfilesId;
    private Date recordDate;
    private String impression;
    private String mimeType;
    private byte[] imageData;

    private Timestamp createdAt;
    private Timestamp updatedAt;    
}
