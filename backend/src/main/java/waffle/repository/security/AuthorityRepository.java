package waffle.repository.security;

import org.springframework.data.neo4j.repository.Neo4jRepository;

import waffle.domain.db.node.security.Authority;
import waffle.security.AuthorityType;

public interface AuthorityRepository extends Neo4jRepository<Authority, Long> {

    Authority findByAuthorityType(AuthorityType authorityType);

}
