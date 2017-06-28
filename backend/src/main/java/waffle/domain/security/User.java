package waffle.domain.security;

import java.util.HashSet;
import java.util.Set;

import lombok.Data;
import lombok.EqualsAndHashCode;

import org.neo4j.ogm.annotation.GraphId;
import org.neo4j.ogm.annotation.NodeEntity;
import org.neo4j.ogm.annotation.Relationship;

@EqualsAndHashCode(exclude = {"id"})
@Data
@NodeEntity
public class User {

    @GraphId
    private Long id;

    private String name;

    private String password;

    @Relationship(type = "Authority", direction = Relationship.OUTGOING)
    private Set<Authority> authorities;

    public void addAuthority(Authority authority) {
        if (authority == null) {
            return;
        }
        if (authorities == null) {
            authorities = new HashSet<>();
        }
        authorities.add(authority);
    }

}
