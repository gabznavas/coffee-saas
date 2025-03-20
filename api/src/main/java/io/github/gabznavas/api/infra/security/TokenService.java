package io.github.gabznavas.api.infra.security;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.exceptions.JWTCreationException;
import com.auth0.jwt.exceptions.JWTVerificationException;
import io.github.gabznavas.api.entity.User;
import io.github.gabznavas.api.exception.GenerateJWTTokenException;
import io.github.gabznavas.api.exception.TokenNotValidException;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.time.LocalDateTime;
import java.time.ZoneOffset;

@Service
public class TokenService {

    @Value("${api.security.token.secret}")
    private String secret;

    @Value("${api.security.token.issuer}")
    private String issuer;

    @Value("${api.security.token.expiration-date-in-seconds}")
    private String expirationDateInSeconds;


    @Value("${date.zone.off-set}")
    private String zoneOffSet;

    public String generateToken(User user) {
        try {
            Algorithm algorithm = generateAlgorithm();
            String token = JWT.create()
                    .withIssuer(issuer)
                    .withSubject(user.getUsername())
                    .withExpiresAt(generateExpirationDate())
                    .sign(algorithm);
            return token;
        } catch (JWTCreationException exception) {
            throw new GenerateJWTTokenException();
        }
    }

    public String validateTokenAndGetSubject(String token) {
        try {
            Algorithm algorithm = generateAlgorithm();
            String subject = JWT.require(algorithm)
                    .withIssuer(issuer)
                    .build()
                    .verify(token)
                    .getSubject();
            return subject;
        } catch (JWTVerificationException exception) {
            throw new TokenNotValidException();
        }
    }

    private Instant generateExpirationDate() {
        return LocalDateTime.now()
                .plusHours(Integer.parseInt(expirationDateInSeconds))
                .toInstant(ZoneOffset.of(zoneOffSet));
    }

    private Algorithm generateAlgorithm() {
        return Algorithm.HMAC256(secret);
    }
}
