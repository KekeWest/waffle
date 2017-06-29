package waffle.config.Initial;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import lombok.extern.slf4j.Slf4j;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import waffle.domain.security.Authority;
import waffle.domain.security.User;
import waffle.repository.security.AuthorityRepository;
import waffle.repository.security.UserRepository;

@Slf4j
@Component
public class TestDataComponent {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private AuthorityRepository authorityRepository;

    @Transactional
    public void createTestData() {
        log.info("create test data.");

        createUsers();
    }

    private void createUsers() {
        Map<String, Authority> authorities = getAuthorities();
        List<User> users = new ArrayList<>();

        User user = new User();
        user.setName("user1");
        user.setPassword("pass");
        user.addAuthority(authorities.get("USER"));
        users.add(user);

        userRepository.save(users);
    }

    private Map<String, Authority> getAuthorities() {
        HashMap<String, Authority> authorities = new HashMap<>();

        authorityRepository.findAll().forEach(
                (authority) -> {
                    authorities.put(authority.getAuthorityName(), authority);
                });

        return authorities;
    }

}
