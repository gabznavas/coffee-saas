CREATE TABLE IF NOT EXISTS `coffee-db`.`dining_table` (
  `id` BIGINT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NOT NULL,
  `busy` TINYINT NOT NULL,
  `created_at` VARCHAR(45) NULL,
  `updated_at` VARCHAR(45) NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `name_UNIQUE` (`name` ASC) VISIBLE)
ENGINE = InnoDB