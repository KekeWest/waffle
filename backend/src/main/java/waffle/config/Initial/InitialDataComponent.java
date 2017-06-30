package waffle.config.Initial;

import javax.annotation.PostConstruct;

import lombok.extern.slf4j.Slf4j;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import waffle.config.properties.WaffleProperties;

@Slf4j
@Component
public class InitialDataComponent {

    @Autowired
    private WaffleProperties waffleProperties;

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

        if (waffleProperties.isTestMode()) {
            testDataComponent.createTestData();
        }
    }

}
