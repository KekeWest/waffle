package waffle.config.properties;

import java.util.UUID;

import javax.annotation.PostConstruct;

import lombok.Data;

import org.apache.commons.io.FileUtils;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.stereotype.Component;

@Data
@Component
@ConfigurationProperties(prefix = "waffle", ignoreInvalidFields = true)
public class WaffleProperties {

    @Value("${spring.profiles.active:" + Profile.PRODUCTION + "}")
    private String activeProfile;

    private String homeDir;

    private boolean testMode;

    @PostConstruct
    private void init() {
        if (StringUtils.isEmpty(homeDir)) {
            if (isTestMode()) {
                homeDir = FileUtils.getTempDirectoryPath() + "/.waffle_home-" + UUID.randomUUID().toString();
            } else {
                homeDir = FileUtils.getUserDirectoryPath() + "/.waffle_home";
            }
        }

    }

}
