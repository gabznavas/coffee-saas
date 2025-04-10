CREATE TABLE IF NOT EXISTS `payment_items` (
  `id` BIGINT NOT NULL AUTO_INCREMENT,
  `price` DECIMAL(6,2) NOT NULL,
  `quantity` INT NOT NULL,
  `observations` VARCHAR(255) NULL,
  `payment_id` BIGINT NOT NULL,
  `pain_at` TIMESTAMP(6) NOT NULL,
  `canceled_in` TIMESTAMP(6) NULL,
  `command_item_id` BIGINT NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_payment_items_payments1_idx` (`payment_id` ASC) VISIBLE,
  INDEX `fk_payment_items_command_items1_idx` (`command_item_id` ASC) VISIBLE,
  CONSTRAINT `fk_payment_items_payments1`
    FOREIGN KEY (`payment_id`)
    REFERENCES `payments` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_payment_items_command_items1`
    FOREIGN KEY (`command_item_id`)
    REFERENCES `command_items` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION
) ENGINE = InnoDB;
