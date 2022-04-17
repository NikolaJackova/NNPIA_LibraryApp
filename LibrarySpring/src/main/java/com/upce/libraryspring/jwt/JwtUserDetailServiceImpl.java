package com.upce.libraryspring.jwt;

import com.upce.libraryspring.role.RoleService;
import com.upce.libraryspring.role.RoleType;
import com.upce.libraryspring.user.User;
import com.upce.libraryspring.user.UserRepository;
import com.upce.libraryspring.user.dto.UserDto;
import com.upce.libraryspring.user.dto.UserDtoCreation;
import org.modelmapper.ModelMapper;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

@Service
public class JwtUserDetailServiceImpl implements UserDetailsService {
    private final ModelMapper modelMapper;
    private final UserRepository userRepository;
    private final BCryptPasswordEncoder bCryptPasswordEncoder;
    private final RoleService roleService;

    public JwtUserDetailServiceImpl(UserRepository userRepository, BCryptPasswordEncoder bCryptPasswordEncoder, ModelMapper modelMapper, RoleService roleService) {
        this.userRepository = userRepository;
        this.bCryptPasswordEncoder = bCryptPasswordEncoder;
        this.modelMapper = modelMapper;
        this.roleService = roleService;
    }

    @Override
    //TODO why transactional - failed to lazily initialize a collection of role : could not initialize proxy - no Session
    @Transactional
    public JwtUserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new UsernameNotFoundException("User Not Found with username: " + username + "."));
        return JwtUserDetails.build(user);
    }

    @Transactional
    public UserDto createUser(UserDtoCreation userDtoCreation) {
        checkUsernameAndEmail(userDtoCreation);
        User user = modelMapper.map(userDtoCreation, User.class);
        user.setPassword(bCryptPasswordEncoder.encode(user.getPassword()));
        user.getUserRoles().add(roleService.getRoleByRoleType(RoleType.USER));
        User savedUser = userRepository.save(user);
        return modelMapper.map(savedUser, UserDto.class);
    }

    private void checkUsernameAndEmail(UserDtoCreation userDtoCreation){
        User existingUsername = userRepository.findByUsername(userDtoCreation.getUsername()).orElse(null);
        if (existingUsername != null){
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "User with username: " + userDtoCreation.getUsername() + " already exists.");
        }
        User existingEmail = userRepository.findByEmail(userDtoCreation.getEmail()).orElse(null);
        if (existingEmail != null){
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "User with email: " + userDtoCreation.getEmail() + " already exists.");
        }
    }
}
