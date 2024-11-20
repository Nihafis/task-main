CREATE DATABASE IF NOT EXISTS tasks_management;
USE tasks_management;

CREATE TABLE `tasks` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `title` VARCHAR(255) NOT NULL COLLATE 'utf8mb3_general_ci',
  `description` VARCHAR(255) NULL DEFAULT NULL COLLATE 'utf8mb3_general_ci',
  `status` ENUM('1','0') NOT NULL DEFAULT '0' COLLATE 'utf8mb4_0900_ai_ci',
  `created_at` DATETIME NOT NULL DEFAULT (now()),
  `updated_at` DATETIME NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`) USING BTREE
)
COLLATE='utf8mb4_0900_ai_ci'
ENGINE=InnoDB;

CREATE TABLE `users` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `username` VARCHAR(50) NULL DEFAULT NULL COLLATE 'utf8mb4_general_ci',
  `password` VARCHAR(255) NULL DEFAULT NULL COLLATE 'utf8mb4_general_ci',
  `created_at` DATETIME NOT NULL DEFAULT (now()),
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE INDEX `username` (`username`) USING BTREE
)
COLLATE='utf8mb4_0900_ai_ci'
ENGINE=InnoDB;
