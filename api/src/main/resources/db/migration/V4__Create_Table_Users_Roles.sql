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
ENGINE = InnoDB