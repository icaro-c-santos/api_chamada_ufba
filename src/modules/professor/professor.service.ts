import { Pagination } from "../../types/Pagination";
import { createProfessorDto } from "./models/createProfessor.dto";
import { Professor } from "./models/professor.entity";
import { UpdateProfessorDto } from "./models/updateProfessor.dto";
import ProfessorRepository from "./professor.repository";

export default class ProfessorService {
    private professorRepository: ProfessorRepository; 

    constructor() {
        this.professorRepository = new ProfessorRepository(); 
    }
    async createProfessor(data: createProfessorDto):Promise<Professor> {
        const teacher = await this.professorRepository.createProfessor(data);
        return teacher;  
    }
    async getAllProfessor({ page = 1, pageSize = 25 }: Pagination = {}):Promise<Professor[]>{
        const teachers = await this.professorRepository.getAllProfessor(); 
        return teachers; 
    }
    async getProfessorByName(data: { nameProfessor: string } & Pagination): Promise<Professor[]>{
        const teacher = await this.professorRepository.getProfessorByName(data); 
        return teacher; 
    }
    async getProfessorByCpf(cpf: string): Promise<Professor | null> {
        const teacher = await this.professorRepository.getProfessorByCpf(cpf);
        return teacher; 
    }
    async getProfessorByEnrolment (enrolment: string): Promise<Professor | null> {
        const teacher = await this.professorRepository.getProfessorByEnrolment(enrolment);
        return teacher; 
    }
    async updateProfessor(cpf: string, update: UpdateProfessorDto): Promise<boolean>{
        const teacher = await this.professorRepository.updateProfessor(cpf, update); 
        return teacher; 
    }
    async deleteProfessor(cpf: string): Promise<boolean>{
        const deletedTeacher = await this.professorRepository.deleteProfessor(cpf); 
        return deletedTeacher; 
    }
}
