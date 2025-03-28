CREATE TABLE IF NOT EXISTS `coffee-db`.`units` (
  `id` INT NOT NULL,
  `name` VARCHAR(45) NOT NULL,
  `acronym` VARCHAR(10) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `name_UNIQUE` (`name` ASC) VISIBLE,
  UNIQUE INDEX `acronym_UNIQUE` (`acronym` ASC) VISIBLE)
ENGINE = InnoDB