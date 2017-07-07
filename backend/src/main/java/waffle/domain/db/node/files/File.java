package waffle.domain.db.node.files;

import java.time.LocalDateTime;
import java.util.Set;
import java.util.UUID;

import lombok.Data;
import lombok.EqualsAndHashCode;

import org.neo4j.ogm.annotation.GraphId;
import org.neo4j.ogm.annotation.Index;
import org.neo4j.ogm.annotation.NodeEntity;
import org.neo4j.ogm.annotation.Relationship;
import org.neo4j.ogm.annotation.typeconversion.Convert;

import waffle.config.neo4j.converter.LocalDateTimeConverter;

@EqualsAndHashCode(of = {"fileId"})
@Data
@NodeEntity
public class File {

    @GraphId
    private Long id;

    @Index(primary = true, unique = true)
    private String fileId = UUID.randomUUID().toString();

    private String name;

    @Convert(LocalDateTimeConverter.class)
    private LocalDateTime updateDateTime;

    @Convert(LocalDateTimeConverter.class)
    private LocalDateTime createDateTime;

    private String persistenceLocation;

    @Relationship(type = "Ownership", direction = Relationship.INCOMING)
    private Set<Directory> dirs;

}
