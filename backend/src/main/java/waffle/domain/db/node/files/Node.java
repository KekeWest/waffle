package waffle.domain.db.node.files;

import java.time.LocalDateTime;
import java.util.UUID;

import lombok.Data;
import lombok.EqualsAndHashCode;

import org.neo4j.ogm.annotation.GraphId;
import org.neo4j.ogm.annotation.Index;
import org.neo4j.ogm.annotation.typeconversion.Convert;

import waffle.config.neo4j.converter.LocalDateTimeConverter;

@EqualsAndHashCode(of = {"nodeId"})
@Data
public class Node {

    @GraphId
    private Long id;

    @Index(primary = true, unique = true)
    private String nodeId = UUID.randomUUID().toString();

    private String name;

    @Convert(LocalDateTimeConverter.class)
    private LocalDateTime updateDateTime;

    @Convert(LocalDateTimeConverter.class)
    private LocalDateTime createDateTime;

}
