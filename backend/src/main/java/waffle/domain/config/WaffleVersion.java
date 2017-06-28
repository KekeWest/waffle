package waffle.domain.config;

import lombok.Data;
import lombok.EqualsAndHashCode;

import org.neo4j.ogm.annotation.GraphId;
import org.neo4j.ogm.annotation.NodeEntity;


@EqualsAndHashCode(exclude = {"id"})
@Data
@NodeEntity
public class WaffleVersion {

    @GraphId
    private Long id;

    private String version;

}
