package waffle.domain.db.node.files;

import java.time.LocalDateTime;

import lombok.Data;

import org.neo4j.ogm.annotation.typeconversion.Convert;

import waffle.config.neo4j.converter.LocalDateTimeConverter;

@Data
public class Node {

    private String name;

    @Convert(LocalDateTimeConverter.class)
    private LocalDateTime updateDateTime;

    @Convert(LocalDateTimeConverter.class)
    private LocalDateTime createDateTime;

}
