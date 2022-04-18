package com.upce.libraryspring.user;

import com.upce.libraryspring.user.dto.UserDto;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Spy;
import org.mockito.junit.jupiter.MockitoExtension;
import org.modelmapper.ModelMapper;
import org.springframework.test.context.junit4.SpringRunner;

import java.util.Optional;

import static org.assertj.core.api.AssertionsForClassTypes.assertThat;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.BDDMockito.given;
import static org.mockito.BDDMockito.willDoNothing;
import static org.mockito.Mockito.*;

@RunWith(SpringRunner.class)
@ExtendWith(MockitoExtension.class)
public class UserServiceTests {
    @Spy
    private ModelMapper modelMapper;

    @Mock
    private UserRepository userRepository;

    @InjectMocks
    private UserServiceImpl userService;

    private User user;

    @BeforeEach
    public void setup(){
        user = new User();
        user.setUsername("test-test-test");
        user.setEmail("test@test.test");
        user.setPassword("Heslo123");

    }

    public void testSaveUser(){
        given(userRepository.findByUsername(user.getEmail()))
                .willReturn(Optional.empty());
        given(userRepository.save(user)).willReturn(user);
    }

    @Test
    public void testUpdateUser(){
        // given - precondition or setup
        given(userRepository.save(user)).willReturn(user);
        given(userRepository.findByUsername(user.getUsername())).willReturn(Optional.of(user));
        user.setEmail("new-test@test.com");

        UserDto userDto = new UserDto();
        userDto.setUsername(user.getUsername());
        userDto.setEmail(user.getEmail());

        // when -  action or the behaviour that we are going test
        UserDto updatedUser = userService.updateUserByUsername(user.getUsername(), userDto);

        // then - verify the output
        assertThat(updatedUser.getEmail()).isEqualTo("new-test@test.com");
    }
}
