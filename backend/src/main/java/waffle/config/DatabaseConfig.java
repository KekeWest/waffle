package waffle.config;

import org.apache.commons.lang3.StringUtils;
import org.springframework.boot.autoconfigure.data.neo4j.Neo4jProperties;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.neo4j.repository.config.EnableNeo4jRepositories;

import waffle.WaffleApplication;
import waffle.config.properties.WaffleProperties;

@Configuration
@EnableNeo4jRepositories(basePackageClasses = WaffleApplication.class)
public class DatabaseConfig {

    @Bean
    public org.neo4j.ogm.config.Configuration configuration(Neo4jProperties properties, WaffleProperties waffleProperties) {
        if (StringUtils.isEmpty(properties.getUri())) {
            properties.setUri("file://" + waffleProperties.getHomeDir() + "/waffle_neo4j");
        }
        return properties.createConfiguration();
    }

}
