DROP DATABASE IF EXISTS animal_shelter_db;
CREATE DATABASE animal_shelter_db;
USE animal_shelter_db;

CREATE TABLE `animals` (
  `id` integer PRIMARY KEY,
  `name` varchar(255),
  `age` integer,
  `description` text,
  `photo` varchar(255)
);

CREATE TABLE `adoptions` (
  `id` integer PRIMARY KEY,
  `animal_id` integer,
  `client_id` integer,
  `adoption_status` varchar(255),
  `adoption_date` date,
  `approved_by` integer
);

CREATE TABLE `clients` (
  `id` integer PRIMARY KEY,
  `first_name` varchar(255),
  `last_name` varchar(255),
  `email` varchar(255),
  `address` varchar(255),
  `password` varchar(255)
);

CREATE TABLE `favourites` (
  `id` integer PRIMARY KEY,
  `client_id` integer,
  `animal_id` integer
);

CREATE TABLE `employees` (
  `id` integer PRIMARY KEY,
  `first_name` varchar(255),
  `last_name` varchar(255),
  `email` varchar(255),
  `address` varchar(255),
  `password` varchar(255)
);

ALTER TABLE `adoptions` ADD FOREIGN KEY (`animal_id`) REFERENCES `animals` (`id`);

ALTER TABLE `clients` ADD FOREIGN KEY (`id`) REFERENCES `adoptions` (`client_id`);

ALTER TABLE `favourites` ADD FOREIGN KEY (`client_id`) REFERENCES `clients` (`id`);

ALTER TABLE `favourites` ADD FOREIGN KEY (`animal_id`) REFERENCES `animals` (`id`);

ALTER TABLE `adoptions` ADD FOREIGN KEY (`approved_by`) REFERENCES `employees` (`id`);
