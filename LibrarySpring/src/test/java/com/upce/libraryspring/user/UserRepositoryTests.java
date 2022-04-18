package com.upce.libraryspring.user;

import org.junit.jupiter.api.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.boot.test.autoconfigure.orm.jpa.TestEntityManager;
import org.springframework.test.context.junit4.SpringRunner;
import static org.assertj.core.api.Assertions.assertThat;

@RunWith(SpringRunner.class)
@DataJpaTest
@AutoConfigureTestDatabase(replace= AutoConfigureTestDatabase.Replace.NONE)
public class UserRepositoryTests {
    @Autowired
    private TestEntityManager entityManager;

    @Autowired
    private UserRepository userRepository;

    @Test
    public void testSaveUser_whenOk() {
        User savedUser = userRepository.save(createUser("test-test-test", "test@test.test", "Heslo123"));
        assertThat(savedUser).hasFieldOrPropertyWithValue("username", "test-test-test");
        assertThat(savedUser).hasFieldOrPropertyWithValue("email", "test@test.test");
        assertThat(savedUser).hasFieldOrPropertyWithValue("password", "Heslo123").isNotEqualTo(true);
    }

    @Test
    public void testFindUserById() {
        User user = createUser("test-test-test", "test@test.test", "Heslo123");
        entityManager.persist(user);
        User byId = userRepository.findById(user.getId()).get();
        assertThat(user).isEqualTo(byId);
    }

    @Test
    public void testFindUserByUsername() {
        User user = createUser("test-test-test", "test@test.test", "Heslo123");
        entityManager.persist(user);
        User byUsername = userRepository.findByUsername(user.getUsername()).get();
        assertThat(user).isEqualTo(byUsername);
    }

    @Test
    public void testFindUserByEmail() {
        User user = createUser("test-test-test", "test@test.test", "Heslo123");
        entityManager.persist(user);
        User byEmail = userRepository.findByEmail(user.getEmail()).get();
        assertThat(user).isEqualTo(byEmail);
    }
    @Test
    public void testDeleteUserById(){
        User user1 = createUser("test-test-test", "test@test.test", "Heslo123");
        entityManager.persist(user1);
        User user2 = createUser("test-test-test-test", "test-test@test.test", "Heslo123");
        entityManager.persist(user2);
        userRepository.deleteById(user2.getId());
        Iterable users = userRepository.findAll();
        assertThat(users).contains(user1);
        assertThat(users).doesNotContain(user2);
    }

    private User createUser(String username, String email, String password){
        User user = new User();
        user.setUsername(username);
        user.setEmail(email);
        user.setPassword(password);
        return user;
    }
}
