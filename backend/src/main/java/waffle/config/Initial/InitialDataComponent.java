package waffle.config.Initial;

import javax.annotation.PostConstruct;

import lombok.extern.slf4j.Slf4j;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import waffle.config.properties.Profile;

@Slf4j
@Component
public class InitialDataComponent {

    @Value("${spring.profiles.active:" + Profile.PRODUCTION + "}")
    private String activeProfile;

    @Autowired
    private HomeDirectoryComponent homeDirectoryComponent;

    @Autowired
    private MasterDataComponent masterDataComponent;

    @Autowired
    private TestDataComponent testDataComponent;

    @PostConstruct
    private void init() {
        homeDirectoryComponent.init();
        masterDataComponent.createMasterData();

        if (activeProfile.equals(Profile.LOCAL)) {
            testDataComponent.createTestData();
        }
    }

}
