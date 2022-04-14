package com.upce.libraryspring.jwt;

import lombok.Getter;

import java.io.Serializable;

public class JwtResponse implements Serializable {
    private static final long serialVersionUID = -8091879091924046844L;
    @Getter
    private final String jwttoken;

    @Getter
    private final String username;

    public JwtResponse(String jwttoken, String username) {
        this.jwttoken = jwttoken;
        this.username = username;
    }

}
