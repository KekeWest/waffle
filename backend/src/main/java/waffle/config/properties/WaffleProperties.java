package waffle.config.properties;

import lombok.Data;

import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.stereotype.Component;

@Data
@Component
@ConfigurationProperties(prefix = "waffle", ignoreInvalidFields = true)
public class WaffleProperties {

    private String homeDir = "~/.waffle_home";

}
