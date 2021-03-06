package waffle.repository.files;

import org.springframework.data.neo4j.repository.Neo4jRepository;

import waffle.domain.db.node.files.Area;

public interface AreaRepository extends Neo4jRepository<Area, Long> {

}
