package waffle.repository.files;

import org.springframework.data.neo4j.repository.Neo4jRepository;

import waffle.domain.db.node.files.Directory;

public interface DirectoryRepository extends Neo4jRepository<Directory, String> {

}
