import { Pagination } from "../../types/Pagination";
import { createProfessorDto } from "./models/createProfessor.dto";
import { Professor } from "./models/professor.entity";
import { UpdateProfessorDto } from "./models/updateProfessor.dto";
import ProfessorRepository from "./professor.repository";

export default class ProfessorService {
    private prepository: ProfessorRepository; 

    constructor() {
        this.prepository = new ProfessorRepository(); 
    }
    async createProfessor(data: createProfessorDto):Promise<Professor> {
        const teacher = await this.prepository.createProfessor(data);
        return teacher;  
    }
    async getAllProfessor({ page = 1, pageSize = 25 }: Pagination = {}):Promise<Professor[]>{
        const teachers = await this.prepository.getAllProfessor(); 
        return teachers; 
    }
    async getProfessorByName(data: { nameProfessor: string } & Pagination): Promise<Professor[]>{
        const teacher = await this.prepository.getProfessorByName(data); 
        return teacher; 
    }
    async getProfessorByCpf(cpf: string): Promise<Professor | null> {
        const teacher = await this.prepository.getProfessorByCpf(cpf);
        return teacher; 
    }
    async getProfessorByEnrolment (enrolment: string): Promise<Professor | null> {
        const teacher = await this.prepository.getProfessorByEnrolment(enrolment);
        return teacher; 
    }
    async updateProfessor(cpf: string, update: UpdateProfessorDto): Promise<boolean>{
        const teacher = await this.prepository.updateProfessor(cpf, update); 
        return teacher; 
    }
    async deleteProfessor(cpf: string): Promise<boolean>{
        const deletedTeacher = await this.prepository.deleteProfessor(cpf); 
        return deletedTeacher; 
    }
}
