package com.upce.libraryspring.jwt;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.upce.libraryspring.role.Role;
import com.upce.libraryspring.user.User;
import com.upce.libraryspring.user.dto.UserDtoCreation;
import lombok.Getter;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

public class JwtUserDetails implements UserDetails {
    @Getter
    private Integer id;
    @Getter
    private String username;
    @JsonIgnore
    @Getter
    private String password;
    @Getter
    private Collection<? extends GrantedAuthority> authorities;

    public JwtUserDetails(Integer id, String username, String password, Collection<? extends GrantedAuthority> authorities) {
        this.id = id;
        this.username = username;
        this.password = password;
        this.authorities = authorities;
    }

    public static JwtUserDetails build(User user) {
        List<GrantedAuthority> authorities = user.getUserRoles().stream()
                .map(role -> new SimpleGrantedAuthority(role.getRoleType().name()))
                .collect(Collectors.toList());
        return new JwtUserDetails(
                user.getId(),
                user.getUsername(),
                user.getPassword(),
                authorities);
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }
}
