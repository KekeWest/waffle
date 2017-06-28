package waffle.repository.security;

import org.springframework.data.neo4j.repository.GraphRepository;

import waffle.domain.security.Authority;

public interface AuthorityRepository extends GraphRepository<Authority> {

    Authority findByAuthorityName(String authorityName);

}
