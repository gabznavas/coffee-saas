CREATE TABLE IF NOT EXISTS `coffee-db`.`product_categories` (
  `id` BIGINT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `category_UNIQUE` (`name` ASC) VISIBLE)
ENGINE = InnoDB