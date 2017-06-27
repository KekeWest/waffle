package waffle.domain.security;

import lombok.Data;

import org.neo4j.ogm.annotation.GraphId;
import org.neo4j.ogm.annotation.NodeEntity;

@Data
@NodeEntity
public class User {

    @GraphId
    private Long id;

    private String name;

    private String password;

}
