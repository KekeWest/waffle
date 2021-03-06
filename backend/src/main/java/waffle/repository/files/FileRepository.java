package waffle.repository.files;

import org.springframework.data.neo4j.repository.Neo4jRepository;

import waffle.domain.db.node.files.File;

public interface FileRepository extends Neo4jRepository<File, Long> {

}
