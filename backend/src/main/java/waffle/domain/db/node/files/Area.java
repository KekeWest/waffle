package waffle.domain.db.node.files;

import java.util.HashSet;
import java.util.Set;

import lombok.Data;
import lombok.EqualsAndHashCode;

import org.neo4j.ogm.annotation.GraphId;
import org.neo4j.ogm.annotation.Index;
import org.neo4j.ogm.annotation.NodeEntity;
import org.neo4j.ogm.annotation.Relationship;

import waffle.domain.db.node.security.User;

@EqualsAndHashCode(of = {"name"})
@Data
@NodeEntity
public class Area {

    @GraphId
    private Long id;

    @Index(primary = true, unique = true)
    private String name;

    @Relationship(type = "Member", direction = Relationship.INCOMING)
    private Set<User> users;

    @Relationship(type = "Ownership", direction = Relationship.OUTGOING)
    private Set<Directory> dirs;

    public void addDirectory(Directory dir) {
        if (dir == null) {
            return;
        }
        if (dirs == null) {
            dirs = new HashSet<>();
        }
        dirs.add(dir);
    }

    public void clearDirectory() {
        if (dirs == null) {
            return;
        }
        dirs.clear();
    }

    public void addUsers(User... us) {
        if (users == null) {
            users = new HashSet<>();
        }
        for (User u : us) {
            if (u == null || users.contains(u)) {
                continue;
            }
            users.add(u);
            u.addAreas(this);
        }
    }

}
