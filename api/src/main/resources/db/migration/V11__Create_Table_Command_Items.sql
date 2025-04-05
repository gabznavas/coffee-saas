CREATE TABLE IF NOT EXISTS `coffee-db`.`command_items` (
  `id` BIGINT NOT NULL AUTO_INCREMENT,
  `quantity` INT NOT NULL,
  `price` DECIMAL(6,2) NOT NULL,
  `product_id` BIGINT NOT NULL,
  `command_id` BIGINT NOT NULL,
  `observations` VARCHAR(255) NULL,
  `canceled_in` TIMESTAMP(6) NULL,
  `created_at` TIMESTAMP(6) NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_commands_items_products1_idx` (`product_id` ASC) VISIBLE,
  INDEX `fk_commands_items_commands1_idx` (`command_id` ASC) VISIBLE,
  CONSTRAINT `fk_commands_items_products1`
    FOREIGN KEY (`product_id`)
    REFERENCES `coffee-db`.`products` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_commands_items_commands1`
    FOREIGN KEY (`command_id`)
    REFERENCES `coffee-db`.`commands` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB