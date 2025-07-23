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

    @Column(unique = true, name = "mail_address")
    private String mailAddress;

    private String password;
    private Date birthday;

    @Column(name = "marriage_start")
    private Date marriageStart;

    private String name;

    @Column(name = "marriage_timing")
    private Date marriageTiming;

    @Column(name = "home_skill")
    private Integer homeSkill;

    @Column(name = "economic_power")
    private Integer economicPower;

    private Integer appearance;
    private Integer communication;
    private Integer consideration;

    @Column(name = "child_wish")
    private Integer childWish;

    @Column(name = "live_with_parents")
    private Integer liveWithParents;

    @Column(name = "dual_income")
    private Integer dualIncome;

    @Column(name = "ideal_height")
    private Integer idealHeight;

    @Column(name = "ideal_income")
    private Integer idealIncome;

    @Column(name = "ideal_education")
    private Integer idealEducation;

    @Column(name = "ideal_age_difference")
    private Integer idealAgeDifference;

    @Column(name = "ideal_home_area")
    private String idealHomeArea;

    @Column(name = "ideal_housing_type")
    private Integer idealHousingType;

    @Column(name = "ideal_job")
    private String idealJob;

    @Column(name = "ideal_home_skill")
    private Integer idealHomeSkill;

    @Column(name = "ideal_economic_power")
    private Integer idealEconomicPower;

    @Column(name = "ideal_appearance")
    private Integer idealAppearance;

    @Column(name = "ideal_consideration")
    private Integer idealConsideration;

    @Column(name = "ideal_communication")
    private Integer idealCommunication;

    @Column(name = "ideal_contact_freq")
    private Integer idealContactFreq;

    @Column(name = "ideal_initiative")
    private Integer idealInitiative;

    @Column(name = "ideal_personality")
    private Integer idealPersonality;

    @Column(name = "ideal_marriage_intent")
    private Integer idealMarriageIntent;

    @Column(name = "ideal_financial_sense")
    private Integer idealFinancialSense;

    @Column(name = "ideal_smoker")
    private Integer idealSmoker;

    @Column(name = "ideal_alcohol")
    private Integer idealAlcohol;

    @Column(name = "ideal_gamble")
    private Integer idealGamble;

    @Column(name = "ideal_has_children")
    private Integer idealHasChildren;

    @Column(name = "ideal_transferable")
    private Integer idealTransferable;

    @Column(name = "ideal_driver_license")
    private Integer idealDriverLicense;

    @Column(name = "ideal_has_divorce")
    private Integer idealHasDivorce;

    @Column(name = "created_at")
    private Timestamp createdAt;

    @Column(name = "updated_at")
    private Timestamp updatedAt;
}
