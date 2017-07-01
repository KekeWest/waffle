package waffle.repository.files;

import org.springframework.data.neo4j.repository.GraphRepository;

import waffle.domain.files.DirectoryNode;

public interface DirectoryNodeRepository extends GraphRepository<DirectoryNode> {

}
