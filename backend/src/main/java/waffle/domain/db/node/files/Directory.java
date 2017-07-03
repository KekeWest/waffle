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

@EqualsAndHashCode(of = {"dirId"})
@Data
@NodeEntity
public class Directory {

    public static final String ROOT_NAME = "/";

    @GraphId
    private Long id;

    @Index(primary = true, unique = true)
    private String dirId = UUID.randomUUID().toString();

    private String name;

    @Relationship(type = "Ownership", direction = Relationship.INCOMING)
    private Set<Directory> parentDirs;

    @Relationship(type = "Ownership", direction = Relationship.OUTGOING)
    private Set<Directory> dirs;

    @Relationship(type = "Ownership", direction = Relationship.OUTGOING)
    private Set<File> files;

    public void addDirectories(Directory... ds) {
        if (dirs == null) {
            dirs = new HashSet<>();
        }
        for (Directory d : ds) {
            if (d == null) {
                continue;
            }
            dirs.add(d);
        }
    }

    public void removeDirectories(Directory... ds) {
        if (dirs == null) {
            return;
        }
        for (Directory d : ds) {
            if (d == null) {
                continue;
            }
            dirs.remove(d);
        }
    }

    public void addFiles(File... fs) {
        if (files == null) {
            files = new HashSet<>();
        }
        for (File f : fs) {
            if (f == null) {
                continue;
            }
            files.add(f);
        }
    }

    public void removeFiles(File... fs) {
        if (files == null) {
            return;
        }
        for (File f : fs) {
            if (f == null) {
                continue;
            }
            files.remove(f);
        }
    }

}
