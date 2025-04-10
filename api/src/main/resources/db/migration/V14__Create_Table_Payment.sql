CREATE TABLE IF NOT EXISTS `payments` (
  `id` BIGINT NOT NULL AUTO_INCREMENT,
  `payment_method_id` BIGINT NOT NULL,
  `command_id` BIGINT NOT NULL,
  `command_item_id` BIGINT NOT NULL,
  `total_price` DECIMAL(6,2) NOT NULL,
  `pain_at` TIMESTAMP(6) NULL,
  `canceled_in` TIMESTAMP(6) NULL,
  `cashier_id` BIGINT NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_payments_payment_methods1_idx` (`payment_method_id` ASC) VISIBLE,
  INDEX `fk_payments_commands1_idx` (`command_id` ASC) VISIBLE,
  INDEX `fk_payments_commands_items1_idx` (`command_item_id` ASC) VISIBLE,
  INDEX `fk_payments_users1_idx` (`cashier_id` ASC) VISIBLE,
  CONSTRAINT `fk_payments_payment_methods1`
    FOREIGN KEY (`payment_method_id`)
    REFERENCES `payment_methods` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_payments_commands1`
    FOREIGN KEY (`command_id`)
    REFERENCES `commands` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_payments_commands_items1`
    FOREIGN KEY (`command_item_id`)
    REFERENCES `command_items` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_payments_users1`
    FOREIGN KEY (`cashier_id`)
    REFERENCES `users` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION
) ENGINE = InnoDB;
