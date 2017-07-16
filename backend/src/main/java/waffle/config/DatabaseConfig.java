package waffle.config;

import java.io.File;

import javax.annotation.PostConstruct;
import javax.annotation.PreDestroy;

import org.apache.commons.lang3.StringUtils;
import org.neo4j.graphdb.GraphDatabaseService;
import org.neo4j.graphdb.factory.GraphDatabaseFactory;
import org.neo4j.kernel.configuration.BoltConnector;
import org.neo4j.ogm.session.SessionFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.data.neo4j.Neo4jProperties;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.neo4j.repository.config.EnableNeo4jRepositories;
import org.springframework.transaction.annotation.EnableTransactionManagement;

import waffle.config.neo4j.eventlistener.NodeEventListener;
import waffle.config.properties.WaffleProperties;
import waffle.domain.db.node.EntityMarker;
import waffle.repository.RepositoryMarker;

@Configuration
@EnableNeo4jRepositories(basePackageClasses = { RepositoryMarker.class })
@EntityScan(basePackageClasses = { EntityMarker.class })
@EnableTransactionManagement
public class DatabaseConfig {

    @Autowired
    private WaffleProperties waffleProperties;

    @Autowired
    private Neo4jProperties neo4jProperties;

    @Autowired
    private SessionFactory sessionFactory;

    private GraphDatabaseService graphDatabaseService;

    @Bean
    public org.neo4j.ogm.config.Configuration configuration() {
        if (StringUtils.isEmpty(neo4jProperties.getUri())) {
            if (waffleProperties.isTestMode()) {
                startTestDatabase();
                neo4jProperties.setUri("bolt://localhost:8687");
            } else {
                neo4jProperties.setUri("file://" + waffleProperties.getHomeDir() + "/waffle_neo4j");
            }
        }
        return neo4jProperties.createConfiguration();
    }

    @PostConstruct
    public void setEventListener() {
        sessionFactory.register(new NodeEventListener());
    }

    private void startTestDatabase() {
        BoltConnector boltConnector = new BoltConnector("0");

        graphDatabaseService = new GraphDatabaseFactory()
                .newEmbeddedDatabaseBuilder(new File(waffleProperties.getHomeDir() + "/waffle_neo4j"))
                .setConfig(boltConnector.type, "BOLT")
                .setConfig(boltConnector.enabled, "true")
                .setConfig(boltConnector.listen_address, "localhost:8687")
                .newGraphDatabase();
    }

    @PreDestroy
    private void shutdownTestDatabase() {
        if (graphDatabaseService != null) {
            graphDatabaseService.shutdown();
        }
    }

}
