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
    async createProfessor(data: createProfessorDto):Promise<any> {
        const teacher = await this.prepository.createProfessor(data);
        return teacher;  
    }
    async getAllProfessor():Promise<any>{
        const teachers = await this.prepository.getAllProfessor(); 
        return teachers; 
    }
    async getProfessorByName(data: { nameProfessor: string } & Pagination): Promise<any>{
        const teacher = await this.prepository.getProfessorByName(data); 
        return teacher; 
    }
    async getProfessorByCpf(cpf: string): Promise<any> {
        const teacher = await this.prepository.getProfessorByCpf(cpf);
        return teacher; 
    }
    async getProfessorByEnrolment (enrolment: string): Promise<any> {
        const teacher = await this.prepository.getProfessorByEnrolment(enrolment);
        return teacher; 
    }
    async updateProfessor(cpf: string, update: UpdateProfessorDto): Promise<any>{
        const teacher = await this.prepository.updateProfessor(cpf, update); 
        return teacher; 
    }
    async deleteProfessor(cpf: string): Promise<any>{
        const deletedTeacher = await this.prepository.deleteProfessor(cpf); 
    }
}
