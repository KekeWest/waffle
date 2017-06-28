package waffle.repository;

import org.springframework.data.neo4j.repository.GraphRepository;

import waffle.domain.security.User;

public interface UserRepository extends GraphRepository<User> {

    User findByName(String username);

}
