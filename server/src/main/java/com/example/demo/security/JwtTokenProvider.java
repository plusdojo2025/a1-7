package com.example.demo.security;

import java.time.Instant;
import java.util.Date;

import javax.crypto.SecretKey;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Component;

import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.MalformedJwtException;
import io.jsonwebtoken.UnsupportedJwtException;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;

@Component
public class JwtTokenProvider {

	private static final Logger logger = LoggerFactory.getLogger(JwtTokenProvider.class);

	@Value("${app.jwtSecret}") // application.properties で設定する秘密鍵
	private String jwtSecret;

	@Value("${app.jwtExpirationMs}") // application.properties で設定する有効期限 (ミリ秒)
	private int jwtExpirationMs;

	// JWT署名のためのキーを取得
	private SecretKey key() {
		return Keys.hmacShaKeyFor(Decoders.BASE64.decode(jwtSecret));
	}

	// JWTトークンの生成
	public String generateToken(Authentication authentication) {
		// UserDetailsServiceImpl で設定した username (ユーザーID) を取得
		String username = authentication.getName(); // UserDetails.getUsername() の値がここにくる

		// 現在時刻をInstantで取得
		Instant nowInstant = Instant.now();
		// 有効期限をInstantで計算
		Instant expiryInstant = nowInstant.plusMillis(jwtExpirationMs);

		return Jwts.builder().claims().subject(username) // JWTのSubjectにユーザーIDを設定
				.issuedAt(Date.from(nowInstant))
				.expiration(Date.from(expiryInstant))
				.and().signWith(key()) // 署名
				.compact();
	}

	// JWTからユーザー名 (Subject) を取得
	public String getUsernameFromJwtToken(String token) {
		// parseClaimsJws -> parseSignedClaims, getBody -> getPayload
		return Jwts.parser().verifyWith(key()).build().parseSignedClaims(token).getPayload().getSubject();
	}

	// JWTトークンの検証
	public boolean validateToken(String authToken) {
		try {
			Jwts.parser().verifyWith(key()).build().parseSignedClaims(authToken);
			return true;
		} catch (MalformedJwtException e) {
			logger.error("Invalid JWT token: {}", e.getMessage());
		} catch (ExpiredJwtException e) {
			logger.error("JWT token is expired: {}", e.getMessage());
		} catch (UnsupportedJwtException e) {
			logger.error("JWT token is unsupported: {}", e.getMessage());
		} catch (IllegalArgumentException e) {
			logger.error("JWT claims string is empty: {}", e.getMessage());
		} catch (io.jsonwebtoken.security.SignatureException e) {
			logger.error("Invalid JWT signature: {}", e.getMessage());
		}
		return false;
	}
}