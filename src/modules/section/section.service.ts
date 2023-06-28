import { Pagination } from "../../types/Pagination";
import { Professor } from "../professor/models/professor.entity";
import { Student } from "../student/models/student.entity";
import { CreateSectionDto } from "./models/createSection.dto";
import Section from "./models/section.entity";
import SectionRepository from "./section.repository";

export default class SectionService {
    private sectionRepository: SectionRepository

    constructor(){
        this.sectionRepository = new SectionRepository(); 
    }
    async createSection(create: CreateSectionDto): Promise<Section> {
        const section = await this.sectionRepository.createSection(create);
        return section; 
    }

    async getAllSections({ page = 1, pageSize = 25 }: Pagination = {}): Promise<Section[]> {
      const sections = await this.sectionRepository.getAllSections(); 
      return sections; 
    }

    async getProfessorsInSection(code: number): Promise<Professor[]> {
        const teacher = await this.sectionRepository.getProfessorsInSection(code);
        return teacher; 
    }

    async getStudentsInSection(code: number): Promise<Student[]> {
        const student = await this.sectionRepository.getStudentsInSection(code); 
        return student; 

    }

    async addProfessorInSection(sectionCode: number, professorCode: number): Promise<boolean> {
        const teacher = await this.sectionRepository.addProfessorInSection(sectionCode,professorCode); 
        return teacher; 

    }

    async removeProfessorInSection(sectionCode: number, professorCode: number): Promise<boolean> {
      const deletedTeacher = await this.sectionRepository.removeProfessorInSection(sectionCode,professorCode); 
      return deletedTeacher; 
    }

    async addStudentInSection(sectionCode: number, studentEnrolment: number): Promise<boolean> {
        const student = await this.sectionRepository.addStudentInSection(sectionCode, studentEnrolment);
        return student; 
    }

    async removeStudentInSection(sectionCode: number, studentEnrolment: number): Promise<boolean> {
       const deletedStudent = await this.sectionRepository.removeStudentInSection(sectionCode, studentEnrolment); 
       return deletedStudent; 
    }
}