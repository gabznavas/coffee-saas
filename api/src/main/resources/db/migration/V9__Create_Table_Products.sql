CREATE TABLE IF NOT EXISTS `coffee-db`.`products` (
  `id` BIGINT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NOT NULL,
  `description` VARCHAR(500) NOT NULL,
  `product_category_id` BIGINT NOT NULL,
  `created_at` DATETIME(6) NOT NULL,
  `updated_at` DATETIME(6) NULL,
  `deleted_at` DATETIME(6) NULL,
  `stock` INT NOT NULL,
  `unit_id` INT NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `name_UNIQUE` (`name` ASC) VISIBLE,
  INDEX `fk_products_categories1_idx` (`product_category_id` ASC) VISIBLE,
  INDEX `fk_products_unit1_idx` (`unit_id` ASC) VISIBLE,
  CONSTRAINT `fk_products_categories1`
    FOREIGN KEY (`product_category_id`)
    REFERENCES `coffee-db`.`product_categories` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_products_unit1`
    FOREIGN KEY (`unit_id`)
    REFERENCES `coffee-db`.`units` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB