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
@Table(name = "messages")
public class Messages {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    private Integer usersId;
    private Integer partnersId;
//    private String partnersName;
    private String mood;
    private String matter;
    private String prompt;
//    private String mood;
//    private String matter;
//    private String prompt;
    private String commandSentence;

    private Timestamp createdAt;
    private Timestamp updatedAt;
}
