import { Pagination } from "../../types/Pagination";
import { CreateSubjectDto } from "./models/createSubject.dto";
import Subject from "./models/subject.entity";
import SubjectRepository from "./subject.repository";

export default class SubjectService{
    private subjectRepository: SubjectRepository

    constructor(){
        this.subjectRepository = new SubjectRepository(); 
    }

    async createSubject(create: CreateSubjectDto): Promise<Subject> {
        const subject = await this.subjectRepository.createSubject(create); 
        return subject; 
    }

    async getAllSubjects({ page = 1, pageSize = 25 }: Pagination = {}): Promise<Subject[]> {
        const subjects = await this.subjectRepository.getAllSubjects();
        return subjects; 
    }

    async getSubjectByName(data: { subjectName: string } & Pagination): Promise<Subject[]> {
        const subject = await this.subjectRepository.getSubjectByName(data);
        return subject; 
    }

    async getSubjectByCode(code: string): Promise<Subject | null> {
        const subject = await this.subjectRepository.getSubjectByCode(code);
        return subject; 
    }

    async deleteRoom(code: string): Promise<boolean> {
        const roomDeleted = await this.subjectRepository.deleteRoom(code);
        return roomDeleted 
    }
}