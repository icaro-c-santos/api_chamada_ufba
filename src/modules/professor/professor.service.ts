import { Pagination } from "../../types/Pagination";
import { Professor } from "./models/professor.entity";
import ProfessorRepository from "./professor.repository";

export default class ProfessorService {
    private prepository: ProfessorRepository; 

    constructor() {
        this.prepository = new ProfessorRepository(); 
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

}
