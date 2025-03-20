package io.github.gabznavas.api.infra.docapi;

import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Info;
import io.swagger.v3.oas.models.info.License;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class OpenApiConfig {

    // json da api -> localhost:8080/v3/api-docs
    // interface web -> localhost:8080/swagger-ui/index.html
    @Bean
    OpenAPI customOpenAPI() {
        return new OpenAPI()
                .info(
                        new Info()
                                .title("Coffee SaaS REST API's RESTful")
                                .version("v1")
                                .description("Coffee SaaS REST API's RESTful")
                                .termsOfService("github.com/gabznavas")
                                .license(new License().name("Apache 2.0").url("github.com/gabznavas"))
                );
    }
}
