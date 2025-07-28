package com.example.demo.controller;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.entity.Users;
import com.example.demo.repository.UsersRepository;
import com.example.demo.security.services.UserDetailsImpl;

@RestController
@RequestMapping("/api/user/")
class ProfileRegistController {

	@Autowired
	private UsersRepository usersRepository;

	// ユーザー情報取得
	@GetMapping("/")
	public ResponseEntity<Map<String, Object>> getUserProfile() {
		// 1. 現在認証されているユーザーの情報を取得
		Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

		// 認証プリンシパルからUserDetailsImplオブジェクトを取得
		UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();

		// UserDetailsImpl からログインユーザーのIDを取得
		Integer loggedInUserId = userDetails.getId();

		// 2. ログインユーザーのIDに紐づくユーザー情報をデータベースから取得
		Optional<Users> userOptional = usersRepository.findById(loggedInUserId);

		Map<String, Object> response = new HashMap<>();
		if (userOptional.isPresent()) {
			Users user = userOptional.get();
			response.put("status", "success");
			response.put("message", "ユーザー情報が正常に取得されました。");
			response.put("data", user); // 取得したユーザー情報をdataとして返す
			return ResponseEntity.ok(response); // 200 OK
		} else {
			response.put("status", "error");
			response.put("message", "ユーザーが見つかりませんでした。");
			return new ResponseEntity<>(response, HttpStatus.NOT_FOUND); // 404 Not Found
		}
	}

	// ユーザー情報更新
	@PostMapping("/update/")
	public ResponseEntity<Map<String, Object>> updateUserProfile(@RequestBody Users updatedUser) {
		// 1. 現在認証されているユーザーの情報を取得
		Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
		UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();
		Integer loggedInUserId = userDetails.getId();

		// 2. 更新対象のユーザーが、現在ログインしているユーザーと一致するか確認
		if (updatedUser.getId() == null || !updatedUser.getId().equals(loggedInUserId)) {
			Map<String, Object> errorResponse = new HashMap<>();
			errorResponse.put("status", "error");
			errorResponse.put("message", "更新権限がありません。");
			return new ResponseEntity<>(errorResponse, HttpStatus.FORBIDDEN); // 403 Forbidden
		}

		// 3. データベースから既存のユーザー情報を取得＆更新
		Optional<Users> existingUserOptional = usersRepository.findById(loggedInUserId);
		Map<String, Object> response = new HashMap<>();

		if (existingUserOptional.isPresent()) {
			Users existingUser = existingUserOptional.get();
			
			// updatedUserの全フィールドを既存のユーザーにコピー（初期値が設定されているため、nullチェックは不要）
			existingUser.setChildWish(updatedUser.getChildWish()); // 基本情報
			existingUser.setLiveWithParents(updatedUser.getLiveWithParents());
			existingUser.setDualIncome(updatedUser.getDualIncome());
			existingUser.setHomeSkill(updatedUser.getHomeSkill()); // 自己評価
			existingUser.setCommunication(updatedUser.getCommunication());
			existingUser.setEconomicPower(updatedUser.getEconomicPower());
			existingUser.setAppearance(updatedUser.getAppearance());
			existingUser.setConsideration(updatedUser.getConsideration());
			
			existingUser.setIdealHomeSkill(updatedUser.getIdealHomeSkill());
			existingUser.setIdealCommunication(updatedUser.getIdealCommunication());
			existingUser.setIdealEconomicPower(updatedUser.getIdealEconomicPower());
			existingUser.setIdealAppearance(updatedUser.getIdealAppearance());
			existingUser.setIdealConsideration(updatedUser.getIdealConsideration());
			
			existingUser.setIdealContactFreq(updatedUser.getIdealContactFreq());
			existingUser.setIdealPersonality(updatedUser.getIdealPersonality());
			existingUser.setIdealFinancialSense(updatedUser.getIdealFinancialSense());
			existingUser.setIdealInitiative(updatedUser.getIdealInitiative());
			existingUser.setIdealMarriageIntent(updatedUser.getIdealMarriageIntent());
			existingUser.setIdealSmoker(updatedUser.getIdealSmoker());
			existingUser.setIdealAlcohol(updatedUser.getIdealAlcohol());
			existingUser.setIdealGamble(updatedUser.getIdealGamble());
			
			existingUser.setIdealDriverLicense(updatedUser.getIdealDriverLicense());
			existingUser.setIdealTransferable(updatedUser.getIdealTransferable());
			existingUser.setIdealHasDivorce(updatedUser.getIdealHasDivorce());
			existingUser.setIdealHasChildren(updatedUser.getIdealHasChildren());

			Users savedUser = usersRepository.save(existingUser); // データベースに保存

			response.put("status", "success");
			response.put("message", "ユーザー情報が正常に更新されました。");
			response.put("data", savedUser); // 更新後のユーザー情報を返す
			return ResponseEntity.ok(response); // 200 OK
		} else {
			response.put("status", "error");
			response.put("message", "更新対象のユーザーが見つかりませんでした。");
			return new ResponseEntity<>(response, HttpStatus.NOT_FOUND); // 404 Not Found
		}
	}
	
//	// 理想像更新
//		@PutMapping("/edit/ideal/")
//		public ResponseEntity<Map<String, Object>> updateIdeal(@RequestBody Users updatedIdeal) {
//			// 1. 現在認証されているユーザーの情報を取得
//			Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
//			UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();
//			Integer loggedInUserId = userDetails.getId();
//
//			// 2. 更新対象のユーザーが、現在ログインしているユーザーと一致するか確認
//			if (updatedIdeal.getId() == null || !updatedIdeal.getId().equals(loggedInUserId)) {
//				Map<String, Object> errorResponse = new HashMap<>();
//				errorResponse.put("status", "error");
//				errorResponse.put("message", "更新権限がありません。");
//				return new ResponseEntity<>(errorResponse, HttpStatus.FORBIDDEN); // 403 Forbidden
//			}
//
//			// 3. データベースから既存のユーザー情報を取得＆更新
//			Optional<Users> existingUserOptional = usersRepository.findById(loggedInUserId);
//			Map<String, Object> response = new HashMap<>();
//
//			if (existingUserOptional.isPresent()) {
//				Users existingUser = existingUserOptional.get();
//				
//				// updatedUserの全フィールドを既存のユーザーにコピー（初期値が設定されているため、nullチェックは不要）
//				existingUser.setIdealHomeSkill(updatedIdeal.getIdealHomeSkill());
//				existingUser.setIdealCommunication(updatedIdeal.getIdealCommunication());
//				existingUser.setIdealEconomicPower(updatedIdeal.getIdealEconomicPower());
//				existingUser.setIdealAppearance(updatedIdeal.getIdealAppearance());
//				existingUser.setIdealConsideration(updatedIdeal.getIdealConsideration());
//				
//				existingUser.setIdealContactFreq(updatedIdeal.getIdealContactFreq());
//				existingUser.setIdealPersonality(updatedIdeal.getIdealPersonality());
//				existingUser.setIdealFinancialSense(updatedIdeal.getIdealFinancialSense());
//				existingUser.setIdealInitiative(updatedIdeal.getIdealInitiative());
//				existingUser.setIdealMarriageIntent(updatedIdeal.getIdealMarriageIntent());
//				existingUser.setIdealSmoker(updatedIdeal.getIdealSmoker());
//				existingUser.setIdealAlcohol(updatedIdeal.getIdealAlcohol());
//				existingUser.setIdealGamble(updatedIdeal.getIdealGamble());
//				
//				existingUser.setIdealDriverLicense(updatedIdeal.getIdealDriverLicense());
//				existingUser.setIdealTransferable(updatedIdeal.getIdealTransferable());
//				existingUser.setIdealHasDivorce(updatedIdeal.getIdealHasDivorce());
//				existingUser.setIdealHasChildren(updatedIdeal.getIdealHasChildren());
//
//				Users savedIdeal = usersRepository.save(existingUser); // データベースに保存
//
//				response.put("status", "success");
//				response.put("message", "ユーザー情報が正常に更新されました。");
//				response.put("data", savedIdeal); // 更新後のユーザー情報を返す
//				return ResponseEntity.ok(response); // 200 OK
//			} else {
//				response.put("status", "error");
//				response.put("message", "更新対象のユーザーが見つかりませんでした。");
//				return new ResponseEntity<>(response, HttpStatus.NOT_FOUND); // 404 Not Found
//			}
//		}

}
