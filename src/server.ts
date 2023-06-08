import { createSubject } from "./repository/disciplina.repository";
import { createProfessor } from "./repository/professor.repository";
import { createRoom } from "./repository/room.repository";
import { createTurma } from "./repository/turmaRepository";

const run = async () => {
    try {
        const value = await createRoom({ paf: "2132", numero: 272 });
        console.log(value);
    } catch (error: any) {
        console.log(error.message)

    }

}

run().then();