package com.upce.libraryspring.jwt;

import lombok.Getter;
import org.springframework.security.core.GrantedAuthority;

import java.io.Serializable;
import java.util.Collection;

public class JwtResponse implements Serializable {
    private static final long serialVersionUID = -8091879091924046844L;
    @Getter
    private final String jwttoken;

    @Getter
    private final String username;

    @Getter
    private final Collection<? extends GrantedAuthority> authorities;

    public JwtResponse(String jwttoken, String username, Collection<? extends GrantedAuthority> authorities) {
        this.jwttoken = jwttoken;
        this.username = username;
        this.authorities = authorities;
    }

}
