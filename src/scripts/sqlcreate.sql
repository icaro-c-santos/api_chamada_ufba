CREATE TABLE `professores` (
	`codigo` INT NOT NULL AUTO_INCREMENT,
	`cpf` varchar(255) NOT NULL UNIQUE,
	PRIMARY KEY (`codigo`)
);
CREATE TABLE `pessoas` (
	`cpf` varchar(255) NOT NULL,
	`nome` varchar(255) NOT NULL,
	`email` varchar(255) NOT NULL,
	`telefone` BIGINT,
	PRIMARY KEY (`cpf`)
);
CREATE TABLE `alunos` (
	`matricula` INT NOT NULL AUTO_INCREMENT,
	`cpf` varchar(255) NOT NULL UNIQUE,
	PRIMARY KEY (`matricula`)
);
ALTER TABLE `professores` ADD CONSTRAINT `professores_fk0` FOREIGN KEY (`cpf`) REFERENCES `pessoas`(`cpf`) ON DELETE CASCADE;
ALTER TABLE `alunos` ADD CONSTRAINT `alunos_fk0` FOREIGN KEY (`cpf`) REFERENCES `pessoas`(`cpf`) ON DELETE CASCADE;
