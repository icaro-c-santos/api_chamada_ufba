CREATE TABLE `professors` (
	`code` INT NOT NULL AUTO_INCREMENT,
	`cpf` varchar(255) NOT NULL UNIQUE,
	PRIMARY KEY (`code`)
);

CREATE TABLE `persons` (
	`cpf` varchar(255) NOT NULL,
	`name` varchar(255) NOT NULL,
	`email` varchar(255) NOT NULL,
	`phone` BIGINT,
	PRIMARY KEY (`cpf`)
);

CREATE TABLE `students` (
	`enrolment` INT NOT NULL AUTO_INCREMENT,
	`cpf` varchar(255) NOT NULL UNIQUE,
	PRIMARY KEY (`enrolment`)
);

CREATE TABLE `rooms` (
    `paf` VARCHAR(255) NOT NULL,
    `number` INT NOT NULL,
    `code` VARCHAR(255) NOT NULL,
    PRIMARY KEY (`code`)
);

CREATE TABLE `subjects` (
	`code` INT NOT NULL AUTO_INCREMENT,
	`name` varchar(255) NOT NULL,
	`subject_load` BIGINT NOT NULL,
	PRIMARY KEY (`code`)
);

CREATE TABLE `schedules` (
	`code` INT NOT NULL AUTO_INCREMENT,
	`start_time` BIGINT NOT NULL,
	`end_time` BIGINT NOT NULL,
	`day` INT NOT NULL,
	PRIMARY KEY (`code`)
);

ALTER TABLE `professors` ADD CONSTRAINT `professors_fk0` FOREIGN KEY (`cpf`) REFERENCES `persons`(`cpf`) ON DELETE CASCADE;

ALTER TABLE `students` ADD CONSTRAINT `students_fk0` FOREIGN KEY (`cpf`) REFERENCES `persons`(`cpf`) ON DELETE CASCADE;