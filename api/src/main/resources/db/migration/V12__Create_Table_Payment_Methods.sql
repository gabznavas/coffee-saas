CREATE TABLE IF NOT EXISTS `coffee-db`.`payment_methods` (
  `id` BIGINT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `payment_method_UNIQUE` (`name` ASC) VISIBLE)
ENGINE = InnoDB