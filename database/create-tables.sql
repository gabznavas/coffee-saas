-- MySQL Script generated by MySQL Workbench
-- Mon 31 Mar 2025 08:17:03 PM -03
-- Model: New Model    Version: 1.0
-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema coffee-db
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema coffee-db
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `coffee-db` ;
USE `coffee-db` ;

-- -----------------------------------------------------
-- Table `coffee-db`.`users`
-- -----------------------------------------------------
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
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `coffee-db`.`roles`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `coffee-db`.`roles` (
  `id` BIGINT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `role_UNIQUE` (`name` ASC) VISIBLE)
ENGINE = InnoDB
COMMENT = 'CASHIER, MANAGER, ATTENDANT, ADMIN';


-- -----------------------------------------------------
-- Table `coffee-db`.`user_roles`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `coffee-db`.`user_roles` (
  `role_id` BIGINT NOT NULL,
  `user_id` BIGINT NOT NULL,
  PRIMARY KEY (`role_id`, `user_id`),
  INDEX `fk_users_roles_users1_idx` (`user_id` ASC) VISIBLE,
  CONSTRAINT `fk_users_roles_roles`
    FOREIGN KEY (`role_id`)
    REFERENCES `coffee-db`.`roles` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_users_roles_users1`
    FOREIGN KEY (`user_id`)
    REFERENCES `coffee-db`.`users` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `coffee-db`.`dining_table`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `coffee-db`.`dining_table` (
  `id` BIGINT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NOT NULL,
  `busy` TINYINT NOT NULL,
  `created_at` VARCHAR(45) NULL,
  `updated_at` VARCHAR(45) NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `name_UNIQUE` (`name` ASC) VISIBLE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `coffee-db`.`commands`
-- -----------------------------------------------------
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
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `coffee-db`.`product_categories`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `coffee-db`.`product_categories` (
  `id` BIGINT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `category_UNIQUE` (`name` ASC) VISIBLE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `coffee-db`.`units`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `coffee-db`.`units` (
  `id` INT NOT NULL,
  `name` VARCHAR(45) NOT NULL,
  `acronym` VARCHAR(10) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `name_UNIQUE` (`name` ASC) VISIBLE,
  UNIQUE INDEX `acronym_UNIQUE` (`acronym` ASC) VISIBLE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `coffee-db`.`products`
-- -----------------------------------------------------
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
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `coffee-db`.`product_images`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `coffee-db`.`product_images` (
  `id` BIGINT NOT NULL AUTO_INCREMENT,
  `image_url` VARCHAR(500) NOT NULL,
  `product_id` BIGINT NOT NULL,
  `order` INT NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `image_url_UNIQUE` (`image_url` ASC) VISIBLE,
  INDEX `fk_products_images_products1_idx` (`product_id` ASC) VISIBLE,
  CONSTRAINT `fk_products_images_products1`
    FOREIGN KEY (`product_id`)
    REFERENCES `coffee-db`.`products` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `coffee-db`.`command_items`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `coffee-db`.`command_items` (
  `id` BIGINT NOT NULL AUTO_INCREMENT,
  `quantity` INT NOT NULL,
  `price` DECIMAL(6,2) NOT NULL,
  `product_id` BIGINT NOT NULL,
  `command_id` BIGINT NOT NULL,
  `observations` VARCHAR(255) NULL,
  `canceled_in` TIMESTAMP(6) NULL,
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
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `coffee-db`.`payment_methods`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `coffee-db`.`payment_methods` (
  `id` BIGINT NOT NULL AUTO_INCREMENT,
  `payment_method` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `payment_method_UNIQUE` (`payment_method` ASC) VISIBLE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `coffee-db`.`payments`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `coffee-db`.`payments` (
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
    REFERENCES `coffee-db`.`payment_methods` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_payments_commands1`
    FOREIGN KEY (`command_id`)
    REFERENCES `coffee-db`.`commands` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_payments_commands_items1`
    FOREIGN KEY (`command_item_id`)
    REFERENCES `coffee-db`.`command_items` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_payments_users1`
    FOREIGN KEY (`cashier_id`)
    REFERENCES `coffee-db`.`users` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `coffee-db`.`payment_items`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `coffee-db`.`payment_items` (
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
    REFERENCES `coffee-db`.`payments` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_payment_items_command_items1`
    FOREIGN KEY (`command_item_id`)
    REFERENCES `coffee-db`.`command_items` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
