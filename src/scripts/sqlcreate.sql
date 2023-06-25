CREATE TABLE `professors` (
	`codigo` INT NOT NULL AUTO_INCREMENT,
	`cpf` varchar(255) NOT NULL UNIQUE,
	PRIMARY KEY (`codigo`)
);

CREATE TABLE `persons` (
	`cpf` varchar(255) NOT NULL,
	`name` varchar(255) NOT NULL,
	`email` varchar(255) NOT NULL,
	`phone` BIGINT,
	PRIMARY KEY (`cpf`)
);

CREATE TABLE `students` (
	`enrolments` INT NOT NULL AUTO_INCREMENT,
	`cpf` varchar(255) NOT NULL UNIQUE,
	PRIMARY KEY (`enrolments`)
);

CREATE TABLE `rooms` (
    `paf` VARCHAR(255) NOT NULL,
    `number` INT NOT NULL,
    `code` VARCHAR(255) NOT NULL,
    PRIMARY KEY (`code`)
);

ALTER TABLE `professors` ADD CONSTRAINT `professors_fk0` FOREIGN KEY (`cpf`) REFERENCES `persons`(`cpf`) ON DELETE CASCADE;

ALTER TABLE `students` ADD CONSTRAINT `students_fk0` FOREIGN KEY (`cpf`) REFERENCES `persons`(`cpf`) ON DELETE CASCADE;