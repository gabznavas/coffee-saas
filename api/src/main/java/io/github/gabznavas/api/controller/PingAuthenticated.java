package io.github.gabznavas.api.controller;

import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/ping-authenticated")
public class PingAuthenticated {

    @GetMapping("/manager")
    public String pingManager(@AuthenticationPrincipal UserDetails user) {
        return "ping! Your username is: " + user.getUsername();
    }

    @GetMapping("/cashier")
    public String pingCashier(@AuthenticationPrincipal UserDetails user) {
        return "ping! Your username is: " + user.getUsername();
    }

    @GetMapping("/attendant")
    public String pingAttendant(@AuthenticationPrincipal UserDetails user) {
        return "ping! Your username is: " + user.getUsername();
    }

    @GetMapping("/all")
    public String pingAll(@AuthenticationPrincipal UserDetails user) {
        return "ping! Your username is: " + user.getUsername();
    }
}
