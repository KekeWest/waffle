package waffle.repository.security;

import org.springframework.data.neo4j.repository.Neo4jRepository;

import waffle.domain.db.node.security.User;

public interface UserRepository extends Neo4jRepository<User, Long> {

    User findByName(String username);

}
