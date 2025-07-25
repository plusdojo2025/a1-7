package com.example.demo.security.services;
import java.util.Collection;
import java.util.List;
import java.util.Objects;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority; // GrantedAuthorityの実装
import org.springframework.security.core.userdetails.UserDetails;

import com.example.demo.entity.Users;
import com.fasterxml.jackson.annotation.JsonIgnore;

public class UserDetailsImpl implements UserDetails {
    private static final long serialVersionUID = 1L;

    private Integer id;
    private String mailAddress;
    private String name;

    @JsonIgnore
    private String password;

    private Collection<? extends GrantedAuthority> authorities;

    public UserDetailsImpl(Integer id, String mailAddress, String name, String password,
            Collection<? extends GrantedAuthority> authorities) {
        this.id = id;
        this.mailAddress = mailAddress;
        this.name = name;
        this.password = password;
        this.authorities = authorities;
    }

    // UsersエンティティからUserDetailsImplを構築する静的ファクトリメソッド
    public static UserDetailsImpl build(Users user) {
        // ここでユーザーのロールをGrantedAuthorityとして設定します
        // 例えば、ユーザーに"ROLE_USER"というロールがある場合
        List<GrantedAuthority> authorities = List.of(new SimpleGrantedAuthority("ROLE_USER"));
        // もしUsersエンティティにロールが複数ある場合、それをストリームで処理してリストにする

        return new UserDetailsImpl(
                user.getId(),
                user.getMailAddress(),
                user.getName(),
                user.getPassword(), // パスワードはそのまま渡す
                authorities);
    }

    public Integer getId() {
        return id;
    }

    @Override
    public String getUsername() {
        return mailAddress;
    }

    @Override
    public String getPassword() {
        return password;
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return authorities;
    }

    @Override
    public boolean isAccountNonExpired() { return true; }

    @Override
    public boolean isAccountNonLocked() { return true; }

    @Override
    public boolean isCredentialsNonExpired() { return true; }

    @Override
    public boolean isEnabled() { return true; }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        UserDetailsImpl user = (UserDetailsImpl) o;
        return Objects.equals(id, user.id);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id);
    }

    // 必要に応じてgetName()などのゲッターを追加
    public String getName() {
        return name;
    }
}