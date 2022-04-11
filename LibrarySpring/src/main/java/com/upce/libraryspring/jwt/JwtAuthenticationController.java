package com.upce.libraryspring.jwt;

import com.upce.libraryspring.config.JwtTokenUtil;
import com.upce.libraryspring.user.dto.UserDtoCreation;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.*;
import org.springframework.web.bind.annotation.*;

@RestController
public class JwtAuthenticationController {
    private final AuthenticationManager authenticationManager;
    private final JwtTokenUtil jwtTokenUtil;
    private final JwtUserDetailServiceImpl jwtUserDetailServiceImpl;

    public JwtAuthenticationController(AuthenticationManager authenticationManager, JwtTokenUtil jwtTokenUtil, JwtUserDetailServiceImpl jwtUserDetailServiceImpl) {
        this.authenticationManager = authenticationManager;
        this.jwtTokenUtil = jwtTokenUtil;
        this.jwtUserDetailServiceImpl = jwtUserDetailServiceImpl;
    }

    @PostMapping("/authenticate")
    public ResponseEntity<?> createAuthenticationToken(@RequestBody JwtRequest authenticationRequest) throws Exception {

        authenticate(authenticationRequest.getUsername(), authenticationRequest.getPassword());

        final JwtUserDetails jwtUserDetails = jwtUserDetailServiceImpl.loadUserByUsername(authenticationRequest.getUsername());

        final String token = jwtTokenUtil.generateToken(jwtUserDetails);

        return ResponseEntity.ok(new JwtResponse(token));
    }

    @PostMapping(value = "/register")
    public ResponseEntity<?> saveUser(@RequestBody UserDtoCreation userDtoCreation){
        return ResponseEntity.ok(jwtUserDetailServiceImpl.createUser(userDtoCreation));
    }

    private void authenticate(String username, String password) throws Exception {
        try {
            authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(username, password));
        } catch (DisabledException e) {
            throw new Exception("USER_DISABLED", e);
        } catch (BadCredentialsException e) {
            throw new Exception("INVALID_CREDENTIALS", e);
        } catch (LockedException e) {
            throw new Exception("LOCKED_EXCEPTION", e);
        }
    }
}
