package com.example.demo.controller;

import java.util.HashMap;
import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.entity.Users;
import com.example.demo.security.JwtTokenProvider;

@RestController
@RequestMapping("/api/")
public class LoginController {
	
	private static final Logger logger = LoggerFactory.getLogger(LoginController.class);
	
	@Autowired
    private AuthenticationManager authenticationManager;
	
	@Autowired
    private JwtTokenProvider jwtTokenProvider;

	@PostMapping("/login/")
	public ResponseEntity<Map<String, String>> login(@RequestBody Users loginRequest) {
		Map<String, String> responseBody = new HashMap<>(); // レスポンスボディ用のMap
		
		try {
			// SpringSecurity の AuthenticationManager を使って認証を行う
			Authentication authentication = authenticationManager.authenticate(
					new UsernamePasswordAuthenticationToken(
							loginRequest.getMailAddress(), // UserDetailsService の loadUserByUsername にメールアドレスを渡す
		                    loginRequest.getPassword()
		                    )
					);
			
			SecurityContextHolder.getContext().setAuthentication(authentication); // SecurityContext に認証情報を設定
			
			// JWT トークンを生成
            String jwt = jwtTokenProvider.generateToken(authentication);
            
            responseBody.put("message", "Login successful!");
            responseBody.put("accessToken", jwt); // クライアントにJWTトークンを返す
		
			return ResponseEntity.ok(responseBody);
		} catch (Exception e) {
			// 認証失敗
			logger.error("Login process failed, likely during JWT generation: {}", e.getMessage(), e);
			responseBody.put("message", "メールアドレスまたはパスワードが間違っています。");
			return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(responseBody);
		}
	}
}
