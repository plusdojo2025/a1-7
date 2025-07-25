package com.example.demo;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

public class PasswordEncoderUtil {
	public static void main(String[] args) {
        BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();
        String plainPassword1 = "password123";
        String plainPassword2 = "securepass456";
        String plainPassword3 = "mypassword789";
        String plainPassword4 = "yuki2025!";
        String plainPassword5 = "naoPass321";

        System.out.println("password123 hash: " + encoder.encode(plainPassword1));
        System.out.println("securepass456 hash: " + encoder.encode(plainPassword2));
        System.out.println("mypassword789 hash: " + encoder.encode(plainPassword3));
        System.out.println("yuki2025! hash: " + encoder.encode(plainPassword4));
        System.out.println("naoPass321 hash: " + encoder.encode(plainPassword5));
    }
}

