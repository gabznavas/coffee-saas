package io.github.gabznavas.api.infra.security;

import io.github.gabznavas.api.entity.RoleNameType;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import static org.springframework.security.config.Customizer.withDefaults;

@Configuration
@EnableWebSecurity
public class SecurityConfigurations {

    @Autowired
    SecurityFilter securityFilter;


    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity httpSecurity) throws Exception {
        return httpSecurity
                .cors(withDefaults())
                .csrf(csrf -> csrf.disable())
                .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                .authorizeHttpRequests(authorize -> authorize
                        .requestMatchers(HttpMethod.GET, "/swagger-ui/**", "/v3/api-docs/**").permitAll()

                        .requestMatchers(HttpMethod.POST, "/api/v1/auth/login").permitAll()
                        .requestMatchers(HttpMethod.POST, "/api/v1/auth/register").permitAll()

                        .requestMatchers(HttpMethod.GET, "/api/v1/user/logged").hasAnyAuthority(
                                RoleNameType.ATTENDANT.toSpringSecurityRole(),
                                RoleNameType.CASHIER.toSpringSecurityRole(),
                                RoleNameType.MANAGER.toSpringSecurityRole(),
                                RoleNameType.ADMIN.toSpringSecurityRole()
                        )
                        .requestMatchers(HttpMethod.PATCH, "/api/v1/user/profile").hasAnyAuthority(
                                RoleNameType.ATTENDANT.toSpringSecurityRole(),
                                RoleNameType.CASHIER.toSpringSecurityRole(),
                                RoleNameType.MANAGER.toSpringSecurityRole(),
                                RoleNameType.ADMIN.toSpringSecurityRole()
                        )

                        .requestMatchers(HttpMethod.GET, "/api/v1/unit").hasAnyAuthority(
                                RoleNameType.ATTENDANT.toSpringSecurityRole(),
                                RoleNameType.CASHIER.toSpringSecurityRole(),
                                RoleNameType.MANAGER.toSpringSecurityRole(),
                                RoleNameType.ADMIN.toSpringSecurityRole()
                        )

                        .requestMatchers(HttpMethod.GET, "/api/v1/product").hasAnyAuthority(
                                RoleNameType.ATTENDANT.toSpringSecurityRole(),
                                RoleNameType.CASHIER.toSpringSecurityRole(),
                                RoleNameType.MANAGER.toSpringSecurityRole(),
                                RoleNameType.ADMIN.toSpringSecurityRole()
                        )
                        .requestMatchers(HttpMethod.POST, "/api/v1/product").hasAnyAuthority(
                                RoleNameType.MANAGER.toSpringSecurityRole(),
                                RoleNameType.ADMIN.toSpringSecurityRole()
                        )
                        .requestMatchers(HttpMethod.POST, "/api/v1/product/:productId").hasAnyAuthority(
                                RoleNameType.MANAGER.toSpringSecurityRole(),
                                RoleNameType.ADMIN.toSpringSecurityRole()
                        )
                        .requestMatchers(HttpMethod.DELETE, "/api/v1/product/:productId").hasAnyAuthority(
                                RoleNameType.MANAGER.toSpringSecurityRole(),
                                RoleNameType.ADMIN.toSpringSecurityRole()
                        )

                        .requestMatchers(HttpMethod.GET, "/api/v1/product/category").hasAnyAuthority(
                                RoleNameType.ATTENDANT.toSpringSecurityRole(),
                                RoleNameType.CASHIER.toSpringSecurityRole(),
                                RoleNameType.MANAGER.toSpringSecurityRole(),
                                RoleNameType.ADMIN.toSpringSecurityRole()
                        )

                        // examples of authorities
                        .requestMatchers(HttpMethod.GET, "/api/v1/ping-authenticated/all").hasAnyAuthority(
                                RoleNameType.ATTENDANT.toSpringSecurityRole(),
                                RoleNameType.CASHIER.toSpringSecurityRole(),
                                RoleNameType.MANAGER.toSpringSecurityRole(),
                                RoleNameType.ADMIN.toSpringSecurityRole()
                        )
                        .requestMatchers(HttpMethod.GET, "/api/v1/ping-authenticated/manager").hasAuthority(
                                RoleNameType.MANAGER.toSpringSecurityRole()
                        )
                        .requestMatchers(HttpMethod.GET, "/api/v1/ping-authenticated/attendant").hasAuthority(
                                RoleNameType.ATTENDANT.toSpringSecurityRole()
                        )
                        .requestMatchers(HttpMethod.GET, "/api/v1/ping-authenticated/cashier").hasAuthority(
                                RoleNameType.CASHIER.toSpringSecurityRole()
                        )
                        .anyRequest().authenticated()
                )
                .addFilterBefore(securityFilter, UsernamePasswordAuthenticationFilter.class)
                .build();
    }

    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration configuration) throws Exception {
        return configuration.getAuthenticationManager();
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

}
