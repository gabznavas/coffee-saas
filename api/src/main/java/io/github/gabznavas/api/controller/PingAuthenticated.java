package io.github.gabznavas.api.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/ping-authentication")
public class PingAuthentication {

    @GetMapping
    public String ping() {
        return "ping!";
    }
}
