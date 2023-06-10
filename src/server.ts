import { buildStudent } from "./mock/builderStudent";
import { createRoom } from "./repository/room.repository";
import { createStudent } from "./repository/student.repository";
import { addStudentInTurma } from "./repository/turmaRepository";
import { runBuildData } from "./sql/buildData";





runBuildData().then();