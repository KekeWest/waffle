package waffle.config.neo4j.converter;

import java.time.Instant;
import java.time.LocalDateTime;
import java.time.ZoneOffset;
import java.util.Optional;

import org.neo4j.ogm.typeconversion.AttributeConverter;

public class LocalDateTimeConverter implements AttributeConverter<LocalDateTime, Long> {

    @Override
    public Long toGraphProperty(LocalDateTime value) {
        return Optional.ofNullable(value)
                .map(v -> v.toInstant(ZoneOffset.UTC).toEpochMilli())
                .orElse(null);
    }

    @Override
    public LocalDateTime toEntityAttribute(Long value) {
        return Optional.ofNullable(value)
                .map(v -> LocalDateTime.ofInstant(Instant.ofEpochMilli(v), ZoneOffset.UTC))
                .orElse(null);
    }

}
