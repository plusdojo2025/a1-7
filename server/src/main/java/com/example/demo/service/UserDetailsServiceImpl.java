package com.example.demo.service;

import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.example.demo.entity.Users;
import com.example.demo.repository.UsersRepository;
import com.example.demo.security.services.UserDetailsImpl;

@Service
public class UserDetailsServiceImpl implements UserDetailsService {

    private final UsersRepository usersRepository;

    public UserDetailsServiceImpl(UsersRepository usersRepository) {
        this.usersRepository = usersRepository;
    }

    // mailAddress からユーザー情報をロード
    @Override
    public UserDetails loadUserByUsername(String mailAddress) throws UsernameNotFoundException {
        // データベースからメールアドレスでユーザーを検索
        Users user = usersRepository.findByMailAddress(mailAddress)
                .orElseThrow(() -> new UsernameNotFoundException("User not found with mail address: " + mailAddress));

        // カスタムUserDetailsImplをビルドして返す
        return UserDetailsImpl.build(user);
    }
}