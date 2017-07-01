package waffle.domain.files;

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
public class DirectoryNode {

    @GraphId
    private Long id;

    @Index(primary = true, unique = true)
    private String dirId = UUID.randomUUID().toString();

    private String name;

    @Relationship(type = "ownership", direction = Relationship.INCOMING)
    private Set<DirectoryNode> parentDirs;

    @Relationship(type = "ownership", direction = Relationship.OUTGOING)
    private Set<DirectoryNode> dirs;

    @Relationship(type = "ownership", direction = Relationship.OUTGOING)
    private Set<FileNode> files;

    public void addDirectories(DirectoryNode... ds) {
        if (dirs == null) {
            dirs = new HashSet<>();
        }
        for (DirectoryNode d : ds) {
            if (d == null) {
                continue;
            }
            dirs.add(d);
        }
    }

    public void removeDirectories(DirectoryNode... ds) {
        if (dirs == null) {
            return;
        }
        for (DirectoryNode d : ds) {
            if (d == null) {
                continue;
            }
            dirs.remove(d);
        }
    }

    public void addFiles(FileNode... fs) {
        if (files == null) {
            files = new HashSet<>();
        }
        for (FileNode f : fs) {
            if (f == null) {
                continue;
            }
            files.add(f);
        }
    }

    public void removeFiles(FileNode... fs) {
        if (files == null) {
            return;
        }
        for (FileNode f : fs) {
            if (f == null) {
                continue;
            }
            files.remove(f);
        }
    }

}
