
import { Professor } from "../../professor/models/professor.entity";
import { ScheduleDto } from "../../schedule/models/schedule.dto";
import { Student } from "../../student/models/student.entity";
import Subject from "../../subject/models/subject.entity";

export class SectionDto extends Subject {
    code: number
}

export type SectionWithTeacherDto = SectionDto & {
    professors: Professor[]
}

export type SectionWithStudents = SectionDto & {
    students: Student[]
}

export type SectionWithSchedule = SectionDto & {
    schedules: ScheduleDto[]
}


export type SectionWithAll = SectionDto & SectionWithTeacherDto & SectionWithStudents & SectionWithSchedule;



