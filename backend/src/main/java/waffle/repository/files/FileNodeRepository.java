package waffle.repository.files;

import org.springframework.data.neo4j.repository.GraphRepository;

import waffle.domain.files.FileNode;

public interface FileNodeRepository extends GraphRepository<FileNode> {

}
