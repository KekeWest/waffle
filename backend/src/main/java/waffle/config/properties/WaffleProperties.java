package waffle.config.properties;

import lombok.Data;

import org.apache.commons.io.FileUtils;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.stereotype.Component;

@Data
@Component
@ConfigurationProperties(prefix = "waffle", ignoreInvalidFields = true)
public class WaffleProperties {

    private String homeDir = FileUtils.getUserDirectoryPath() + "/.waffle_home";

}
