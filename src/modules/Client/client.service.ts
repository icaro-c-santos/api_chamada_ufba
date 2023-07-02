import { BusinessExceptions } from "../../exceptions/BusinessExceptions";
import { Pagination } from "../../types/Pagination";
import PresenceRepository from "../presence/presence.repository";
import { Professor } from "../professor/models/professor.entity";
import ProfessorRepository from "../professor/professor.repository";
import ScheduleRepository from "../schedule/schedule.repository";
import { CreateSectionDto } from "../section/models/createSection.dto";
import Section from "../section/models/section.entity";
import SectionRepository from "../section/section.repository";
import { Student } from "../student/models/student.entity";


export type SectionTeacher = {
    professorCode: number,
    sectionCode: number
}

export default class ClientService {
    private sectionRepository: SectionRepository
    private presenceRepository: PresenceRepository
    private scheduleRepository: ScheduleRepository
    constructor() {
        this.sectionRepository = new SectionRepository();
        this.presenceRepository = new PresenceRepository();
        this.scheduleRepository = new ScheduleRepository();
    }


    async getAllSectionsTeacher({ page = 1, pageSize = 1000, teacherCode }: Pagination & { teacherCode: number }): Promise<SectionTeacher[]> {

        const sections = await this.sectionRepository.getSectionOfTeacher({ page, pageSize, teacherCode }) as unknown as SectionTeacher[];
        return sections;
    }




}