package waffle.repository.config;

import org.springframework.data.neo4j.repository.GraphRepository;

import waffle.domain.config.WaffleVersion;

public interface WaffleVersionRepository extends GraphRepository<WaffleVersion> {

}
