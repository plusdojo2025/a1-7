package com.example.demo.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.demo.entity.Users;

public interface UsersRepository extends JpaRepository<Users, Integer> {
	
//	@Query(value = "SELECT count(*) FROM Users WHERE mail_address=? AND password=?"
//			,nativeQuery = true)
//	Integer getUsers(@Param("mailAddress") String mail_address, @Param("password") String password);
}


