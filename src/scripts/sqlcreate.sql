CREATE TABLE `professors` (
	`code` INT NOT NULL AUTO_INCREMENT,
	`cpf` varchar(255) NOT NULL UNIQUE,
	PRIMARY KEY (`code`)
);

CREATE TABLE `persons` (
	`cpf` varchar(255) NOT NULL,
	`name` varchar(255) NOT NULL,
	`email` varchar(255) NOT NULL,
	`phone` INT NOT NULL,
	PRIMARY KEY (`cpf`)
);

CREATE TABLE `students` (
	`enrolment` INT NOT NULL AUTO_INCREMENT,
	`cpf` varchar(255) NOT NULL UNIQUE,
	PRIMARY KEY (`enrolment`)
);

CREATE TABLE `rooms` (
	`code` INT NOT NULL AUTO_INCREMENT UNIQUE,
	`paf` varchar(255) NOT NULL,
	`number` INT NOT NULL,
	PRIMARY KEY (`paf`,`number`)
);

CREATE TABLE `subjects` (
	`code` INT NOT NULL AUTO_INCREMENT,
	`name` varchar(255) NOT NULL,
	`subject_load` INT NOT NULL,
	PRIMARY KEY (`code`)
);

CREATE TABLE `schedules` (
	`code` INT NOT NULL AUTO_INCREMENT UNIQUE,
	`start_time` INT NOT NULL,
	`end_time` INT NOT NULL,
	`day` INT NOT NULL,
	`sectionCode` INT NOT NULL,
	`roomCode` INT NOT NULL,
	PRIMARY KEY (`start_time`,`end_time`,`day`,`sectionCode`,`roomCode`)
);

CREATE TABLE `students_sections` (
	`studentEnrolment` INT NOT NULL AUTO_INCREMENT,
	`sectionCode` INT NOT NULL,
	PRIMARY KEY (`studentEnrolment`,`sectionCode`)
);

CREATE TABLE `sections` (
	`code` INT NOT NULL AUTO_INCREMENT,
	`subject` INT NOT NULL,
	PRIMARY KEY (`code`)
);

CREATE TABLE `presences` (
	`status` INT NOT NULL,
	`scheduleCode` INT NOT NULL,
	`studentEnrolment` INT NOT NULL,
	`date` DATE NOT NULL,
	PRIMARY KEY (`scheduleCode`,`studentEnrolment`,`date`)
);

ALTER TABLE `presences` ADD CONSTRAINT `presences_fk0` FOREIGN KEY (`status`) REFERENCES `status`(`id`) ON DELETE CASCADE;

ALTER TABLE `presences` ADD CONSTRAINT `presences_fk1` FOREIGN KEY (`scheduleCode`) REFERENCES `schedules`(`code`) ON DELETE CASCADE;

ALTER TABLE `presences` ADD CONSTRAINT `presences_fk2` FOREIGN KEY (`studentEnrolment`) REFERENCES `students_sections`(`studentEnrolment`) ON DELETE CASCADE;

CREATE TABLE `status` (
	`id` INT NOT NULL AUTO_INCREMENT,
	`value` varchar(255) NOT NULL,
	PRIMARY KEY (`id`)
);

CREATE TABLE `professors_sections` (
	`professorCode` INT NOT NULL,
	`sectionCode` INT NOT NULL,
	PRIMARY KEY (`professorCode`,`sectionCode`)
);

INSERT INTO `banco_api`.`status` (`id`, `value`) VALUES ('1', 'presente');
INSERT INTO `banco_api`.`status` (`id`, `value`) VALUES ('2', 'ausente');
INSERT INTO `banco_api`.`status` (`id`, `value`) VALUES ('3', 'abonado');

ALTER TABLE `professors` ADD CONSTRAINT `professors_fk0` FOREIGN KEY (`cpf`) REFERENCES `persons`(`cpf`) ON DELETE CASCADE;

ALTER TABLE `students` ADD CONSTRAINT `students_fk0` FOREIGN KEY (`cpf`) REFERENCES `persons`(`cpf`) ON DELETE CASCADE;

ALTER TABLE `schedules` ADD CONSTRAINT `schedules_fk0` FOREIGN KEY (`sectionCode`) REFERENCES `sections`(`code`) ON DELETE CASCADE;

ALTER TABLE `schedules` ADD CONSTRAINT `schedules_fk1` FOREIGN KEY (`roomCode`) REFERENCES `rooms`(`code`) ON DELETE CASCADE;

ALTER TABLE `students_sections` ADD CONSTRAINT `students_sections_fk0` FOREIGN KEY (`studentEnrolment`) REFERENCES `students`(`enrolment`);

ALTER TABLE `students_sections` ADD CONSTRAINT `students_sections_fk1` FOREIGN KEY (`sectionCode`) REFERENCES `sections`(`code`) ON DELETE CASCADE;

ALTER TABLE `sections` ADD CONSTRAINT `sections_fk0` FOREIGN KEY (`subject`) REFERENCES `subjects`(`code`) ON DELETE CASCADE;

ALTER TABLE `professors_sections` ADD CONSTRAINT `professors_sections_fk0` FOREIGN KEY (`professorCode`) REFERENCES `professors`(`code`) ON DELETE CASCADE;

ALTER TABLE `professors_sections` ADD CONSTRAINT `professors_sections_fk1` FOREIGN KEY (`sectionCode`) REFERENCES `sections`(`code`) ON DELETE CASCADE;



CREATE TABLE `user` (
    `login` varchar(255) NOT NULL,
    `senha` varchar(255) NOT NULL,
    `token` varchar(255) NOT NULL,
    `enrolment` INT NULL,
    `codeProfessor` INT NULL,
    PRIMARY KEY (`login`),
    CONSTRAINT `user_fk0` FOREIGN KEY (`enrolment`) REFERENCES `students`(`enrolment`) ON DELETE CASCADE,
    CONSTRAINT `user_fk1` FOREIGN KEY (`codeProfessor`) REFERENCES `professors`(`code`) ON DELETE CASCADE
);