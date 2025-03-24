package io.github.gabznavas.api.commandrunner;

import io.github.gabznavas.api.log.LoggerCustom;
import io.github.gabznavas.api.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

@Component
public class UserCommandRunner implements CommandLineRunner {

    @Autowired
    private UserService userService;

    @Override
    public void run(String... args) {
        LoggerCustom.logInfo(UserCommandRunner.class, "Try register User ADMIN");

        try {
            userService.registerAdmin();
            LoggerCustom.logInfo(UserCommandRunner.class, " User ADMIN Created");

        } catch (Exception ex) {
            LoggerCustom.logInfo(UserCommandRunner.class, " User ADMIN Already Created");
        }

    }
}
