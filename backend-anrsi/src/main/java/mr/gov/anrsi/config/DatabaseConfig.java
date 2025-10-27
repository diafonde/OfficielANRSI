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

    @Value("${spring.datasource.url:}")
    private String datasourceUrl;

    @Value("${spring.datasource.username:}")
    private String username;

    @Value("${spring.datasource.password:}")
    private String password;

    @Bean
    @Primary
    public DataSource dataSource() {
        // If DATABASE_URL is provided (Render format), parse it
        if (datasourceUrl != null && datasourceUrl.startsWith("postgres://")) {
            try {
                URI dbUri = new URI(datasourceUrl);
                String newDatasourceUrl = "jdbc:postgresql://" + dbUri.getHost() + ':' + dbUri.getPort() + dbUri.getPath();
                String[] credentials = dbUri.getUserInfo().split(":");
                String newUsername = credentials[0];
                String newPassword = credentials.length > 1 ? credentials[1] : "";

                return DataSourceBuilder.create()
                        .url(newDatasourceUrl)
                        .username(newUsername)
                        .password(newPassword)
                        .build();
            } catch (URISyntaxException e) {
                throw new RuntimeException("Failed to parse DATABASE_URL", e);
            }
        }

        // Otherwise use the standard Spring configuration
        DataSourceBuilder<?> builder = DataSourceBuilder.create();
        
        if (datasourceUrl != null && !datasourceUrl.isEmpty() && datasourceUrl.startsWith("jdbc:")) {
            builder.url(datasourceUrl);
        }
        
        if (username != null && !username.isEmpty()) {
            builder.username(username);
        }
        
        if (password != null && !password.isEmpty()) {
            builder.password(password);
        }
        
        return builder.build();
    }
}

