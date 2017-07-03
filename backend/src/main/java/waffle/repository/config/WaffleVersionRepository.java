package waffle.repository.config;

import org.springframework.data.neo4j.repository.Neo4jRepository;

import waffle.domain.db.node.config.WaffleVersion;

public interface WaffleVersionRepository extends Neo4jRepository<WaffleVersion, Long> {

}
