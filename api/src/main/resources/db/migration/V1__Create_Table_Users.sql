CREATE TABLE IF NOT EXISTS `coffee-db`.`users` (
  `id` BIGINT NOT NULL AUTO_INCREMENT,
  `full_name` VARCHAR(45) NOT NULL,
  `email` VARCHAR(45) NOT NULL,
  `password` VARCHAR(500) NOT NULL,
  `created_at` DATETIME(6) NOT NULL,
  `updated_at` DATETIME(6) NULL,
  `deleted_at` DATETIME(6) NULL,
  `disabled_at` DATETIME(6) NULL,
  `profile_image_url` VARCHAR(500) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `email_UNIQUE` (`email` ASC) VISIBLE)
ENGINE = InnoDB