package waffle.domain.files;

import java.util.Set;
import java.util.UUID;

import lombok.Data;
import lombok.EqualsAndHashCode;

import org.neo4j.ogm.annotation.GraphId;
import org.neo4j.ogm.annotation.Index;
import org.neo4j.ogm.annotation.NodeEntity;
import org.neo4j.ogm.annotation.Relationship;

@EqualsAndHashCode(of = {"fileId"})
@Data
@NodeEntity
public class FileNode {

    @GraphId
    private Long id;

    @Index(primary = true, unique = true)
    private String fileId = UUID.randomUUID().toString();

    private String name;

    private String persistenceLocation;

    @Relationship(type = "ownership", direction = Relationship.INCOMING)
    private Set<DirectoryNode> dirs;

}
