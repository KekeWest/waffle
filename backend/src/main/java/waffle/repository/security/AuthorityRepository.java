package waffle.repository.security;

import org.springframework.data.neo4j.repository.GraphRepository;

import waffle.domain.security.Authority;
import waffle.security.AuthorityType;

public interface AuthorityRepository extends GraphRepository<Authority> {

    Authority findByAuthorityType(AuthorityType authorityType);

}
