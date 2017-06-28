package waffle.domain.security;

import java.util.Set;

import lombok.Data;
import lombok.EqualsAndHashCode;

import org.neo4j.ogm.annotation.GraphId;
import org.neo4j.ogm.annotation.Index;
import org.neo4j.ogm.annotation.NodeEntity;
import org.neo4j.ogm.annotation.Relationship;

@EqualsAndHashCode(exclude = {"id"})
@Data
@NodeEntity
public class Authority {

    @GraphId
    private Long id;

    @Index(primary = true, unique = true)
    private String authorityName;

    @Relationship(type = "User", direction = Relationship.INCOMING)
    private Set<User> users;

}
