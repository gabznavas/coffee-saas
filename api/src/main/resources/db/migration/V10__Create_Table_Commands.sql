CREATE TABLE IF NOT EXISTS `coffee-db`.`commands` (
  `id` BIGINT NOT NULL AUTO_INCREMENT,
  `client_name` VARCHAR(45) NULL,
  `dining_table_id` BIGINT NOT NULL,
  `attendant_id` BIGINT NOT NULL,
  `opened_at` TIMESTAMP(6) NOT NULL,
  `canceled_in` TIMESTAMP(6) NULL,
  `price_total` DECIMAL(6,2) NOT NULL,
  `closed_at` VARCHAR(45) NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_commands_tables1_idx` (`dining_table_id` ASC) VISIBLE,
  INDEX `fk_commands_users1_idx` (`attendant_id` ASC) VISIBLE,
  CONSTRAINT `fk_commands_tables1`
    FOREIGN KEY (`dining_table_id`)
    REFERENCES `coffee-db`.`dining_table` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_commands_users1`
    FOREIGN KEY (`attendant_id`)
    REFERENCES `coffee-db`.`users` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB