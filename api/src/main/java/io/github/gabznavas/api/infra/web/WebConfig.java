package io.github.gabznavas.api.infra.web;

import org.springframework.context.annotation.Configuration;
import org.springframework.http.MediaType;
import org.springframework.web.servlet.config.annotation.ContentNegotiationConfigurer;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig implements WebMvcConfigurer {

    /**
     * Configura a negociação de conteúdo, definindo o uso de parâmetros de consulta
     * para especificar o formato de mídia desejado (JSON ou XML).
     *
     * @param configurer Objeto usado para configurar a negociação de conteúdo.
     */
    @Override
    public void configureContentNegotiation(ContentNegotiationConfigurer configurer) {
        configurer
                // Exemplo: não será utilizado o parâmetro ?mediaType=xml na URL.
                .favorParameter(false)
                // Ativa o uso do cabeçalho "Accept" da requisição para determinar o tipo de mídia.
                // Por exemplo, se o cabeçalho 'Accept: application/xml' for enviado, a resposta será no formato XML.
                .ignoreAcceptHeader(false)

                // Permite que a negociação de conteúdo não dependa somente das extensões de arquivo registradas.
                .useRegisteredExtensionsOnly(false)

                // Define JSON como o formato de resposta padrão, caso o cabeçalho "Accept" não seja enviado ou seja inválido.
                .defaultContentType(MediaType.APPLICATION_JSON)

                // Registra os tipos de mídia suportados pela API, mapeando a extensão 'json' para JSON
                // e 'xml' para XML, além do cabeçalho "Accept".
                .mediaType("json", MediaType.APPLICATION_JSON)  // Suporta JSON.
                .mediaType("xml", MediaType.APPLICATION_XML)  // Suporta XML.
                .mediaType("x-yaml", MediaType.APPLICATION_YAML);  // Suporta YAML.
    }
}
