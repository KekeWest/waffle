package waffle.config.Initial;

import java.util.HashMap;

import javax.annotation.PostConstruct;

import lombok.extern.slf4j.Slf4j;

import org.neo4j.ogm.session.Session;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

@Slf4j
@Component
public class InitialDataComponent {

    @Value("${spring.profiles.active:production}")
    private String activeProfile;

    @Autowired
    private HomeDirectoryComponent homeDirectoryComponent;

    @Autowired
    private MasterDataComponent masterDataComponent;

    @Autowired
    private TestDataComponent testDataComponent;

    @Autowired
    private Session session;

    @PostConstruct
    private void init() {
        homeDirectoryComponent.init();

        if (activeProfile.equals("local")) {
            deleteTestData();
            masterDataComponent.createMasterData();
            testDataComponent.createTestData();
        } else {
            masterDataComponent.createMasterData();
        }
    }

    @Transactional
    private void deleteTestData() {
        session.query("MATCH (n) DETACH DELETE n", new HashMap<>());
        log.info("clear database.");
    }

}
