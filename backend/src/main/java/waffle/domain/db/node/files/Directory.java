package waffle.domain.db.node.files;

import java.util.HashSet;
import java.util.Set;

import lombok.Data;
import lombok.EqualsAndHashCode;

import org.neo4j.ogm.annotation.NodeEntity;
import org.neo4j.ogm.annotation.Relationship;

@EqualsAndHashCode(of = {}, callSuper = true)
@Data
@NodeEntity
public class Directory extends Node {

    public static final String ROOT_NAME = "/";

    @Relationship(type = "Ownership", direction = Relationship.INCOMING)
    private Set<Directory> parentDirs;

    @Relationship(type = "Ownership", direction = Relationship.OUTGOING)
    private Set<Directory> dirs;

    @Relationship(type = "Ownership", direction = Relationship.OUTGOING)
    private Set<File> files;

    public void addParentDirectory(Directory dir) {
        if (parentDirs == null) {
            parentDirs = new HashSet<>();
        }
        if (dir != null && !parentDirs.contains(dir)) {
            parentDirs.add(dir);
            dir.addDirectories(this);
        }
    }

    public void removeParentDirectory(Directory dir) {
        if (parentDirs == null) {
            return;
        }
        if (dir != null && parentDirs.contains(dir)) {
            parentDirs.remove(dir);
            dir.removeDirectories(this);
        }
    }

    public void addDirectories(Directory... ds) {
        if (dirs == null) {
            dirs = new HashSet<>();
        }
        for (Directory d : ds) {
            if (d == null || dirs.contains(d)) {
                continue;
            }
            dirs.add(d);
            d.addParentDirectory(this);
        }
    }

    public void removeDirectories(Directory... ds) {
        if (dirs == null) {
            return;
        }
        for (Directory d : ds) {
            if (d == null || !dirs.contains(d)) {
                continue;
            }
            dirs.remove(d);
            d.removeParentDirectory(this);
        }
    }

    public void addFiles(File... fs) {
        if (files == null) {
            files = new HashSet<>();
        }
        for (File f : fs) {
            if (f == null || files.contains(f)) {
                continue;
            }
            files.add(f);
            f.addDirectory(this);
        }
    }

    public void removeFiles(File... fs) {
        if (files == null) {
            return;
        }
        for (File f : fs) {
            if (f == null || !files.contains(f)) {
                continue;
            }
            files.remove(f);
            f.removeDirectory(this);
        }
    }

}
