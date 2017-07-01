package waffle.service;

import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

import waffle.domain.files.AreaNode;
import waffle.domain.security.User;
import waffle.repository.security.UserRepository;

@Service
public class AreaService {

    @Autowired
    private UserRepository userRepository;

    public List<String> getAllAreaNames(Authentication authentication) {
        return getAllAreaNode(authentication.getName()).stream()
                .map(AreaNode::getName)
                .collect(Collectors.toList());
    }

    private Set<AreaNode> getAllAreaNode(String username) {
        User user = userRepository.findByName(username);
        if (user == null || user.getAreas() == null) {
            return new HashSet<>();
        }
        return user.getAreas();
    }

}
