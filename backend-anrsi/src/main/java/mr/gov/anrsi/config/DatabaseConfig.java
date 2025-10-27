package mr.gov.anrsi.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.jdbc.DataSourceBuilder;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Primary;

import javax.sql.DataSource;
import java.net.URI;
import java.net.URISyntaxException;

@Configuration
public class DatabaseConfig {

    @Value("${DATABASE_URL:}")
    private String databaseUrl;

    @Bean
    @Primary
    public DataSource dataSource() {
        // If DATABASE_URL is provided (Render format), parse it
        if (databaseUrl != null && !databaseUrl.isEmpty()) {
            try {
                URI dbUri = new URI(databaseUrl);
                String datasourceUrl = "jdbc:postgresql://" + dbUri.getHost() + ':' + dbUri.getPort() + dbUri.getPath();
                String[] credentials = dbUri.getUserInfo().split(":");
                String username = credentials[0];
                String password = credentials.length > 1 ? credentials[1] : "";

                return DataSourceBuilder.create()
                        .url(datasourceUrl)
                        .username(username)
                        .password(password)
                        .build();
            } catch (URISyntaxException e) {
                throw new RuntimeException("Failed to parse DATABASE_URL", e);
            }
        }

        // Otherwise use environment variables with defaults
        return DataSourceBuilder.create()
                .url(System.getenv("DATABASE_URL"))
                .build();
    }
}
