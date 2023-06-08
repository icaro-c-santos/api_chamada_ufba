
CREATE TABLE `Professor` (`cpf` varchar(255) NOT NULL,`nome` varchar(255) NOT NULL,`telefone` INT,`email` varchar(255) NOT NULL UNIQUE,PRIMARY KEY (`cpf`));

CREATE TABLE `sala` (`codigo` varchar(255) NOT NULL,`paf` varchar(255) NOT NULL,`numero` BIGINT NOT NULL,
PRIMARY KEY (`codigo`));

CREATE TABLE `aluno` (`cpf` varchar(255) NOT NULL,`nome` varchar(255) NOT NULL,`matricula` BIGINT NOT NULL UNIQUE,`email` varchar(255) NOT NULL UNIQUE,`telefone` BIGINT NOT NULL,PRIMARY KEY (`cpf`));
    
CREATE TABLE `disciplina` (
    `codigo` BIGINT NOT NULL AUTO_INCREMENT,
    `nome` varchar(255) NOT NULL,
    `carga_horaria` BIGINT NOT NULL,
    PRIMARY KEY (`codigo`)
    );
    CREATE TABLE `presenca` (
    `fk_turma_aluno_date_fk_hora` varchar(255) NOT NULL,
    `status` BIGINT NOT NULL,
    `date` DATE NOT NULL,
    `fk_turma_aluno` varchar(255) NOT NULL,
    `fk_horario_turma_sala` varchar(255) NOT NULL,
    PRIMARY KEY (`fk_turma_aluno_date_fk_hora`)
    );
    CREATE TABLE `turma` (
    `codigo` BIGINT NOT NULL AUTO_INCREMENT,
    `nome` varchar(255) NOT NULL,
    `fk_cod_disciplina` BIGINT NOT NULL,
    PRIMARY KEY (`codigo`)
    );
    CREATE TABLE `horario` (
    `codigo` BIGINT NOT NULL AUTO_INCREMENT,
    `hora_inicio` TIME NOT NULL,
    `hora_fim` TIME NOT NULL,
    `dia` varchar(255) NOT NULL,
    `carga_horaria` FLOAT NOT NULL,
    PRIMARY KEY (`codigo`)
    );
    CREATE TABLE `turm_horario_sala` (
    `fk_turma_fk_horario_fk_sala` varchar(255) NOT NULL,
    `fk_cod_turma` BIGINT NOT NULL,
    `fk_cod_horario` BIGINT NOT NULL,
    `fk_cod_sala` varchar(255) NOT NULL,
    PRIMARY KEY (`fk_turma_fk_horario_fk_sala`)
    );
    CREATE TABLE `turma_aluno` (
    `fk_turma_fk_aluno` varchar(255) NOT NULL,
    `fk_cod_turma` BIGINT NOT NULL,
    `fk_cpf_aluno` varchar(255) NOT NULL,
    PRIMARY KEY (`fk_turma_fk_aluno`)
    );
    CREATE TABLE `turma_professor` (
    `fk_turma_fk_professor` varchar(255) NOT NULL,
    `fk_cod_turma` BIGINT NOT NULL,
    `fk_cpf_professor` varchar(255) NOT NULL,
    PRIMARY KEY (`fk_turma_fk_professor`)
    );
    CREATE TABLE `status` (
    `id` BIGINT NOT NULL AUTO_INCREMENT,
    `value` varchar(255) NOT NULL,
    PRIMARY KEY (`id`)
    );

    ALTER TABLE `presenca` ADD CONSTRAINT `presenca_fk0` FOREIGN KEY
    (`status`) REFERENCES `status`(`id`) ON DELETE CASCADE;

    ALTER TABLE `presenca` ADD CONSTRAINT `presenca_fk1` FOREIGN KEY
    (`fk_turma_aluno`) REFERENCES `turma_aluno`(`fk_turma_fk_aluno`) ON DELETE CASCADE;

    ALTER TABLE `presenca` ADD CONSTRAINT `presenca_fk2` FOREIGN KEY
    (`fk_horario_turma_sala`) REFERENCES
    `turm_horario_sala`(`fk_turma_fk_horario_fk_sala`) ON DELETE CASCADE;

    ALTER TABLE `turma` ADD CONSTRAINT `turma_fk0` FOREIGN KEY
    (`fk_cod_disciplina`) REFERENCES `disciplina`(`codigo`) ON DELETE CASCADE;

    ALTER TABLE `turm_horario_sala` ADD CONSTRAINT `turm_horario_sala_fk0`
    FOREIGN KEY (`fk_cod_turma`) REFERENCES `turma`(`codigo`) ON DELETE CASCADE;

    ALTER TABLE `turm_horario_sala` ADD CONSTRAINT `turm_horario_sala_fk1`
    FOREIGN KEY (`fk_cod_horario`) REFERENCES `horario`(`codigo`) ON DELETE CASCADE;

    ALTER TABLE `turm_horario_sala` ADD CONSTRAINT `turm_horario_sala_fk2`
    FOREIGN KEY (`fk_cod_sala`) REFERENCES `sala`(`codigo`) ON DELETE CASCADE;

    ALTER TABLE `turma_aluno` ADD CONSTRAINT `turma_aluno_fk0` FOREIGN
    KEY (`fk_cod_turma`) REFERENCES `turma`(`codigo`) ON DELETE CASCADE;

    ALTER TABLE `turma_aluno` ADD CONSTRAINT `turma_aluno_fk1` FOREIGN
    KEY (`fk_cpf_aluno`) REFERENCES `aluno`(`cpf`) ON DELETE CASCADE;

    ALTER TABLE `turma_professor` ADD CONSTRAINT `turma_professor_fk0`
    FOREIGN KEY (`fk_cod_turma`) REFERENCES `turma`(`codigo`) ON DELETE CASCADE;

    ALTER TABLE `turma_professor` ADD CONSTRAINT `turma_professor_fk1`
    FOREIGN KEY (`fk_cpf_professor`) REFERENCES `Professor`(`cpf`) ON DELETE CASCADE;