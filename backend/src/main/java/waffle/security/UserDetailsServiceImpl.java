package waffle.security;

import java.util.Collection;
import java.util.HashSet;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;

import waffle.domain.repository.UserRepository;

public class UserDetailsServiceImpl implements UserDetailsService {

    @Autowired
    private UserRepository userRepository;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        waffle.domain.entity.User userEntity = userRepository.findByName(username);

        if (userEntity == null) {
            throw new UsernameNotFoundException("user not found.");
        }

        User user = new User(userEntity.getName(), userEntity.getPassword(), getAuthorities(userEntity));
        return user;
    }

    private Collection<? extends GrantedAuthority> getAuthorities(waffle.domain.entity.User userEntity) {
        Set<GrantedAuthority> authorities = new HashSet<>();
        SimpleGrantedAuthority authority = new SimpleGrantedAuthority("USER");
        authorities.add(authority);
        return authorities;
    }

}
