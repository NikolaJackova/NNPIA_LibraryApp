package com.upce.libraryspring.user;

import com.upce.libraryspring.user.dto.UserDto;
import com.upce.libraryspring.user.dto.UserDtoCreation;
import org.modelmapper.ModelMapper;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class UserServiceImpl implements UserService{
    private final ModelMapper modelMapper;
    private final UserRepository userRepository;
    private final BCryptPasswordEncoder passwordEncoder;

    public UserServiceImpl(UserRepository userRepository, ModelMapper modelMapper, BCryptPasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.modelMapper = modelMapper;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public UserDto createUser(UserDtoCreation userDtoCreation) {
        User user = modelMapper.map(userDtoCreation, User.class);
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        User savedUser = userRepository.save(user);
        return modelMapper.map(savedUser, UserDto.class);
    }

    @Override
    public List<UserDto> getUsers() {
        List<User> users = userRepository.findAll();
        return users.stream().map(user -> modelMapper.map(user, UserDto.class)).collect(Collectors.toList());
    }

    @Override
    public UserDto getUserById(Integer id) {
        User user = userRepository.findById(id).orElseThrow();
        return modelMapper.map(user, UserDto.class);
    }
}
