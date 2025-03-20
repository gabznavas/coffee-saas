package io.github.gabznavas.api.log;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class LoggerCustom {

    private static final Logger logger = LoggerFactory.getLogger(LoggerCustom.class);

    public static void logInfo(Class<?> clazz, String message, Object... args) {
        // Obtém o nome do método que chamou esse método de log
        String methodName = new Exception().getStackTrace()[1].getMethodName();

        logger.info("{}:{} - {}", clazz.getSimpleName(), methodName, String.format(message, args));
    }

    public static void logError(Class<?> clazz, String message, Throwable exception) {
        // Obtém o nome do método que chamou esse método de log
        String methodName = new Exception().getStackTrace()[1].getMethodName();

        logger.error("{}:{} - {} - Exception: {}", clazz.getSimpleName(), methodName, message, exception.getMessage());
    }
}
