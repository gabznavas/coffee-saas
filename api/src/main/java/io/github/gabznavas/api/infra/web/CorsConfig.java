package io.github.gabznavas.api.infra.web;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.Arrays;

@Configuration
public class CorsConfig {

    @Value("${cors.origin-patterns:http://localhost:8080}")
    private String originPatterns;

    @Value("${cors.allowed-methods:OPTIONS}")
    private String allowedMethods;

    @Value("${cors.allowed-headers:Content-Type}")
    private String allowedHeaders;

    @Value("${cors.max-age-cache-seconds:3600}")
    private String maxAgeCacheSeconds;

    @Bean
    UrlBasedCorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();
        configuration.setAllowedOrigins(Arrays.stream(originPatterns.split(",")).toList());  // Frontend
        configuration.setAllowedMethods(Arrays.stream(allowedMethods.split(",")).toList());  // Métodos permitidos
        configuration.setAllowedHeaders(Arrays.stream(allowedHeaders.split(",")).toList());  // Cabeçalhos permitidos
        configuration.setMaxAge(Long.valueOf(maxAgeCacheSeconds));  // Cache do CORS para 1 hora
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);
        return source;
    }

}
