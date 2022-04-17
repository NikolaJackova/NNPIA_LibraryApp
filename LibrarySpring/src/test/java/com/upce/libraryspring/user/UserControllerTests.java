package com.upce.libraryspring.user;

import com.upce.libraryspring.config.JwtTokenUtil;
import com.upce.libraryspring.jwt.JwtUserDetailServiceImpl;
import com.upce.libraryspring.jwt.JwtUserDetails;
import com.upce.libraryspring.user.dto.UserDto;
import com.upce.libraryspring.user.dto.UserDtoCreation;
import org.junit.jupiter.api.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.reactive.AutoConfigureWebTestClient;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;
import org.springframework.test.web.reactive.server.WebTestClient;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;

@RunWith(SpringJUnit4ClassRunner.class)
@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
@AutoConfigureWebTestClient
public class UserControllerTests {
    @Autowired
    private WebTestClient webTestClient;

    @Autowired
    private JwtTokenUtil jwtTokenUtil;

    @Autowired
    private JwtUserDetailServiceImpl jwtUserDetailServiceImpl;

    @Test
    public void getTest_withValidToken_receiveOk() throws Exception {
        UserDtoCreation userDtoCreation = new UserDtoCreation();
        userDtoCreation.setUsername("test-user-test");
        userDtoCreation.setEmail("test-user@test-user.test-user");
        userDtoCreation.setPassword("Heslo123");
        UserDto user = jwtUserDetailServiceImpl.createUser(userDtoCreation);
        String tokenString = jwtTokenUtil.generateToken(
                new JwtUserDetails(user.getId(),userDtoCreation.getUsername(), userDtoCreation.getPassword(), new ArrayList<>()));

        webTestClient
                .get().uri("/users/test-user-test")
                .headers(http -> http.setBearerAuth(tokenString))
                .exchange()
                .expectStatus().isOk();
    }
}
