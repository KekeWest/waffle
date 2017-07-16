package waffle.domain.db.node.files;

import java.util.HashSet;
import java.util.Set;
import java.util.UUID;

import lombok.Data;
import lombok.EqualsAndHashCode;

import org.neo4j.ogm.annotation.GraphId;
import org.neo4j.ogm.annotation.Index;
import org.neo4j.ogm.annotation.NodeEntity;
import org.neo4j.ogm.annotation.Relationship;

@EqualsAndHashCode(of = {"fileId"}, callSuper = false)
@Data
@NodeEntity
public class File extends Node {

    @GraphId
    private Long id;

    @Index(primary = true, unique = true)
    private String fileId = UUID.randomUUID().toString();

    private String name;

    private String persistenceLocation;

    @Relationship(type = "Ownership", direction = Relationship.INCOMING)
    private Set<Directory> dirs;

    public void addDirectory(Directory dir) {
        if (dirs == null) {
            dirs = new HashSet<>();
        }
        if (dir != null && !dirs.contains(dir)) {
            dirs.add(dir);
            dir.addFiles(this);
        }
    }

    public void removeDirectory(Directory dir) {
        if (dirs == null) {
            return;
        }
        if (dir != null && dirs.contains(dir)) {
            dirs.remove(dir);
            dir.removeFiles(this);
        }
    }

}
