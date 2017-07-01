package waffle.repository.files;

import org.springframework.data.neo4j.repository.GraphRepository;

import waffle.domain.config.WaffleVersion;
import waffle.domain.files.AreaNode;

public interface AreaNodeRepository extends GraphRepository<AreaNode> {

}
