import { ScheduleDto } from "../modules/schedule/models/schedule.dto"
import Schedule from "../modules/schedule/models/schedule.entity"

export const subjectsMock: {
  subjects_loads: number[],
  names: string[]
} = {
  subjects_loads: [70, 40, 240, 70, 30, 120, 45, 90],
  names: [
    "Matemática Financeira",
    "Biologia",
    "Física",
    "Química",
    "História",
    "Geografia",
    "Literatura",
    "Filosofia",
    "Sociologia",
    "Psicologia",
    "Artes",
    "Educação Física",
    "Inglês",
    "Espanhol",
    "Português",
    "Computação",
    "Economia",
    "Administração",
    "Marketing",
    "Gestão de Projetos",
    "Antropologia",
    "Engenharia Civil",
    "Direito",
    "Medicina",
    "Enfermagem",
    "Matemática",
    "Estudos Ambientais",
    "Ciência da Computação",
    "Engenharia Elétrica",
    "Comunicação Social",
    "Fotografia",
    "Química Orgânica",
    "Bioquímica",
    "Teatro",
    "Música",
    "Design Gráfico",
    "Estatística",
    "Psicologia Organizacional",
    "Ciências Políticas",
    "Astrofísica",
    "Engenharia de Software",
    "Farmácia",
    "Gestão de Recursos Humanos",
    "Jornalismo",
    "Neurociência",
    "Relações Internacionais",
    "Biomedicina",
    "Arquitetura",
    "Linguística",
    "Engenharia Mecânica",
    "Gastronomia",
    "Zoologia",
    "Ciência da Informação",
    "Paleontologia",
    "Oceanografia",
    "Teologia",
    "Antropologia Cultural",
    "Engenharia Química",
    "Letras",
    "Biotecnologia",
    "Ciências Sociais",
    "Design de Interiores",
    "Arqueologia",
    "Engenharia de Alimentos",
    "Educação",
    "Ecologia",
    "Cinema",
    "Genética",
    "Ciência Policial",
    "Teoria Literária",
    "Engenharia de Produção",
    "Turismo",
    "Teoria da Computação",
    "História da Arte",
    "Bioinformática",
    "Geologia",
    "Administração Pública",
    "Cálculo Diferencial",
    "Cálculo Integral",
    "Equações Diferenciais",
    "Análise Numérica",
    "Cálculo de Variações",
    "Cálculo Tensorial",
    "Teoria da Medida",
    "Cálculo de Probabilidades",
    "Cálculo de Funções de Várias Variáveis",
    "Análise Complexa",
    "Cálculo Fracionário",
    "Cálculo Vetorial",
    "Cálculo de Matrizes",
    "Teoria das Séries",
    "Cálculo Estocástico",
    "Cálculo de Derivadas Parciais",
    "Cálculo Integral Generalizado",
    "Cálculo Numérico",
    "Teoria da Aproximação",
    "Cálculo de Laplace",
    "Química Geral",
    "Química Orgânica",
    "Química Inorgânica",
    "Química Analítica",
    "Química Física",
    "Termodinâmica Química",
    "Cinética Química",
    "Eletroquímica",
    "Espectroscopia",
    "Química Ambiental",
    "Química dos Materiais",
    "Química Computacional",
    "Físico-Química",
    "Química Industrial",
    "Química Medicinal",
    "Química de Alimentos",
    "Química Forense",
    "Química Nuclear",
    "Química Bioinorgânica",
    "Química Quântica",
    "Física Clássica",
    "Física Moderna",
    "Mecânica",
    "Eletromagnetismo",
    "Óptica",
    "Termodinâmica",
    "Física de Partículas",
    "Física Quântica",
    "Física Nuclear",
    "Astrofísica",
    "Mecânica Quântica",
    "Física Estatística",
    "Mecânica dos Fluidos",
    "Física do Estado Sólido",
    "Física dos Materiais",
    "Física Experimental",
    "Teoria da Relatividade",
    "Física Matemática",
    "Física Biológica",
    "Física Acústica",
    "Língua Portuguesa",
    "Língua Inglesa",
    "Língua Espanhola",
    "Língua Francesa",
    "Língua Alemã",
    "Língua Italiana",
    "Língua Japonesa",
    "Língua Chinesa",
    "Língua Árabe",
    "Língua Russa",
    "Literatura Brasileira",
    "Literatura Inglesa",
    "Literatura Espanhola",
    "Literatura Francesa",
    "Literatura Portuguesa",
    "Gramática",
    "Fonética",
    "Fonologia",
    "Sintaxe",
    "Semântica",
    "Estilística",
    "Teoria da Literatura",
    "Tradução",
    "Linguística",
    "Análise do Discurso",
    "Escrita Criativa",

  ],
}


export const hoursMock: Omit<Schedule, "code" | "section" | "room">[] = [
  { start_time: 420, end_time: 480, day: 1 },   // 07:00 - 08:00
  { start_time: 480, end_time: 540, day: 1 },   // 08:00 - 09:00
  { start_time: 540, end_time: 600, day: 1 },   // 09:00 - 10:00
  { start_time: 600, end_time: 660, day: 1 },   // 10:00 - 11:00
  { start_time: 660, end_time: 720, day: 1 },   // 11:00 - 12:00
  { start_time: 720, end_time: 780, day: 1 },   // 12:00 - 13:00
  { start_time: 780, end_time: 840, day: 1 },   // 13:00 - 14:00
  { start_time: 840, end_time: 900, day: 1 },   // 14:00 - 15:00
  { start_time: 900, end_time: 960, day: 1 },   // 15:00 - 16:00
  { start_time: 960, end_time: 1020, day: 1 },  // 16:00 - 17:00
  { start_time: 1020, end_time: 1080, day: 1 }, // 17:00 - 18:00
  { start_time: 1080, end_time: 1140, day: 1 }, // 18:00 - 19:00
  { start_time: 1140, end_time: 1200, day: 1 }, // 19:00 - 20:00
  { start_time: 1200, end_time: 1260, day: 1 }, // 20:00 - 21:00
  { start_time: 1260, end_time: 1320, day: 1 }, // 21:00 - 22:00
  { start_time: 1320, end_time: 1380, day: 1 }, // 22:00 - 23:00
  { start_time: 420, end_time: 510, day: 1 },    // 07:00 - 08:30
  { start_time: 480, end_time: 570, day: 1 },    // 08:00 - 09:30
  { start_time: 540, end_time: 630, day: 1 },    // 09:00 - 10:30
  { start_time: 600, end_time: 690, day: 1 },    // 10:00 - 11:30
  { start_time: 660, end_time: 750, day: 1 },    // 11:00 - 12:30
  { start_time: 720, end_time: 810, day: 1 },    // 12:00 - 13:30
  { start_time: 780, end_time: 870, day: 1 },    // 13:00 - 14:30
  { start_time: 840, end_time: 930, day: 1 },    // 14:00 - 15:30
  { start_time: 900, end_time: 990, day: 1 },    // 15:00 - 16:30
  { start_time: 960, end_time: 1050, day: 1 },   // 16:00 - 17:30
  { start_time: 1020, end_time: 1110, day: 1 },  // 17:00 - 18:30
  { start_time: 1080, end_time: 1170, day: 1 },  // 18:00 - 19:30
  { start_time: 1140, end_time: 1230, day: 1 },  // 19:00 - 20:30
  { start_time: 1200, end_time: 1290, day: 1 },  // 20:00 - 21:30
  { start_time: 1260, end_time: 1350, day: 1 }, // 21:00 - 22:30
  { start_time: 1320, end_time: 1410, day: 1 }, // 22:00 - 23:30"
  { start_time: 420, end_time: 480, day: 2 },   // 07:00 - 08:00
  { start_time: 480, end_time: 540, day: 2 },   // 08:00 - 09:00
  { start_time: 540, end_time: 600, day: 2 },   // 09:00 - 10:00
  { start_time: 600, end_time: 660, day: 2 },   // 10:00 - 11:00
  { start_time: 660, end_time: 720, day: 2 },   // 11:00 - 12:00
  { start_time: 720, end_time: 780, day: 2 },   // 12:00 - 13:00
  { start_time: 780, end_time: 840, day: 2 },   // 13:00 - 14:00
  { start_time: 840, end_time: 900, day: 2 },   // 14:00 - 15:00
  { start_time: 900, end_time: 960, day: 2 },   // 15:00 - 16:00
  { start_time: 960, end_time: 1020, day: 2 },  // 16:00 - 17:00
  { start_time: 1020, end_time: 1080, day: 2 }, // 17:00 - 18:00
  { start_time: 1080, end_time: 1140, day: 2 }, // 18:00 - 19:00
  { start_time: 1140, end_time: 1200, day: 2 }, // 19:00 - 20:00
  { start_time: 1200, end_time: 1260, day: 2 }, // 20:00 - 21:00
  { start_time: 1260, end_time: 1320, day: 2 }, // 21:00 - 22:00
  { start_time: 1320, end_time: 1380, day: 2 }, // 22:00 - 23:00
  { start_time: 420, end_time: 510, day: 2 },    // 07:00 - 08:30
  { start_time: 480, end_time: 570, day: 2 },    // 08:00 - 09:30
  { start_time: 540, end_time: 630, day: 2 },    // 09:00 - 10:30
  { start_time: 600, end_time: 690, day: 2 },    // 10:00 - 11:30
  { start_time: 660, end_time: 750, day: 2 },    // 11:00 - 12:30
  { start_time: 720, end_time: 810, day: 2 },    // 12:00 - 13:30
  { start_time: 780, end_time: 870, day: 2 },    // 13:00 - 14:30
  { start_time: 840, end_time: 930, day: 2 },    // 14:00 - 15:30
  { start_time: 900, end_time: 990, day: 2 },    // 15:00 - 16:30
  { start_time: 960, end_time: 1050, day: 2 },   // 16:00 - 17:30
  { start_time: 1020, end_time: 1110, day: 2 },  // 17:00 - 18:30
  { start_time: 1080, end_time: 1170, day: 2 },  // 18:00 - 19:30
  { start_time: 1140, end_time: 1230, day: 2 },  // 19:00 - 20:30
  { start_time: 1200, end_time: 1290, day: 2 },  // 20:00 - 21:30
  { start_time: 1260, end_time: 1350, day: 2 }, // 21:00 - 22:30
  { start_time: 1320, end_time: 1410, day: 2 }, // 22:00 - 23:30"
  { start_time: 420, end_time: 480, day: 3 },   // 07:00 - 08:00
  { start_time: 480, end_time: 540, day: 3 },   // 08:00 - 09:00
  { start_time: 540, end_time: 600, day: 3 },   // 09:00 - 10:00
  { start_time: 600, end_time: 660, day: 3 },   // 10:00 - 11:00
  { start_time: 660, end_time: 720, day: 3 },   // 11:00 - 12:00
  { start_time: 720, end_time: 780, day: 3 },   // 12:00 - 13:00
  { start_time: 780, end_time: 840, day: 3 },   // 13:00 - 14:00
  { start_time: 840, end_time: 900, day: 3 },   // 14:00 - 15:00
  { start_time: 900, end_time: 960, day: 3 },   // 15:00 - 16:00
  { start_time: 960, end_time: 1020, day: 3 },  // 16:00 - 17:00
  { start_time: 1020, end_time: 1080, day: 3 }, // 17:00 - 18:00
  { start_time: 1080, end_time: 1140, day: 3 }, // 18:00 - 19:00
  { start_time: 1140, end_time: 1200, day: 3 }, // 19:00 - 20:00
  { start_time: 1200, end_time: 1260, day: 3 }, // 20:00 - 21:00
  { start_time: 1260, end_time: 1320, day: 3 }, // 21:00 - 22:00
  { start_time: 1320, end_time: 1380, day: 3 }, // 22:00 - 23:00
  { start_time: 420, end_time: 510, day: 3 },    // 07:00 - 08:30
  { start_time: 480, end_time: 570, day: 3 },    // 08:00 - 09:30
  { start_time: 540, end_time: 630, day: 3 },    // 09:00 - 10:30
  { start_time: 600, end_time: 690, day: 3 },    // 10:00 - 11:30
  { start_time: 660, end_time: 750, day: 3 },    // 11:00 - 12:30
  { start_time: 720, end_time: 810, day: 3 },    // 12:00 - 13:30
  { start_time: 780, end_time: 870, day: 3 },    // 13:00 - 14:30
  { start_time: 840, end_time: 930, day: 3 },    // 14:00 - 15:30
  { start_time: 900, end_time: 990, day: 3 },    // 15:00 - 16:30
  { start_time: 960, end_time: 1050, day: 3 },   // 16:00 - 17:30
  { start_time: 1020, end_time: 1110, day: 3 },  // 17:00 - 18:30
  { start_time: 1080, end_time: 1170, day: 3 },  // 18:00 - 19:30
  { start_time: 1140, end_time: 1230, day: 3 },  // 19:00 - 20:30
  { start_time: 1200, end_time: 1290, day: 3 },  // 20:00 - 21:30
  { start_time: 1260, end_time: 1350, day: 3 }, // 21:00 - 22:30
  { start_time: 1320, end_time: 1410, day: 3 }, // 22:00 - 23:30"
  { start_time: 420, end_time: 480, day: 4 },   // 07:00 - 08:00
  { start_time: 480, end_time: 540, day: 4 },   // 08:00 - 09:00
  { start_time: 540, end_time: 600, day: 4 },   // 09:00 - 10:00
  { start_time: 600, end_time: 660, day: 4 },   // 10:00 - 11:00
  { start_time: 660, end_time: 720, day: 4 },   // 11:00 - 12:00
  { start_time: 720, end_time: 780, day: 4 },   // 12:00 - 13:00
  { start_time: 780, end_time: 840, day: 4 },   // 13:00 - 14:00
  { start_time: 840, end_time: 900, day: 4 },   // 14:00 - 15:00
  { start_time: 900, end_time: 960, day: 4 },   // 15:00 - 16:00
  { start_time: 960, end_time: 1020, day: 4 },  // 16:00 - 17:00
  { start_time: 1020, end_time: 1080, day: 4 }, // 17:00 - 18:00
  { start_time: 1080, end_time: 1140, day: 4 }, // 18:00 - 19:00
  { start_time: 1140, end_time: 1200, day: 4 }, // 19:00 - 20:00
  { start_time: 1200, end_time: 1260, day: 4 }, // 20:00 - 21:00
  { start_time: 1260, end_time: 1320, day: 4 }, // 21:00 - 22:00
  { start_time: 1320, end_time: 1380, day: 4 }, // 22:00 - 23:00
  { start_time: 420, end_time: 510, day: 4 },    // 07:00 - 08:30
  { start_time: 480, end_time: 570, day: 4 },    // 08:00 - 09:30
  { start_time: 540, end_time: 630, day: 4 },    // 09:00 - 10:30
  { start_time: 600, end_time: 690, day: 4 },    // 10:00 - 11:30
  { start_time: 660, end_time: 750, day: 4 },    // 11:00 - 12:30
  { start_time: 720, end_time: 810, day: 4 },    // 12:00 - 13:30
  { start_time: 780, end_time: 870, day: 4 },    // 13:00 - 14:30
  { start_time: 840, end_time: 930, day: 4 },    // 14:00 - 15:30
  { start_time: 900, end_time: 990, day: 4 },    // 15:00 - 16:30
  { start_time: 960, end_time: 1050, day: 4 },   // 16:00 - 17:30
  { start_time: 1020, end_time: 1110, day: 4 },  // 17:00 - 18:30
  { start_time: 1080, end_time: 1170, day: 4 },  // 18:00 - 19:30
  { start_time: 1140, end_time: 1230, day: 4 },  // 19:00 - 20:30
  { start_time: 1200, end_time: 1290, day: 4 },  // 20:00 - 21:30
  { start_time: 1260, end_time: 1350, day: 4 }, // 21:00 - 22:30
  { start_time: 1320, end_time: 1410, day: 4 }, // 22:00 - 23:30"
  { start_time: 420, end_time: 480, day: 5 },   // 07:00 - 08:00
  { start_time: 480, end_time: 540, day: 5 },   // 08:00 - 09:00
  { start_time: 540, end_time: 600, day: 5 },   // 09:00 - 10:00
  { start_time: 600, end_time: 660, day: 5 },   // 10:00 - 11:00
  { start_time: 660, end_time: 720, day: 5 },   // 11:00 - 12:00
  { start_time: 720, end_time: 780, day: 5 },   // 12:00 - 13:00
  { start_time: 780, end_time: 840, day: 5 },   // 13:00 - 14:00
  { start_time: 840, end_time: 900, day: 5 },   // 14:00 - 15:00
  { start_time: 900, end_time: 960, day: 5 },   // 15:00 - 16:00
  { start_time: 960, end_time: 1020, day: 5 },  // 16:00 - 17:00
  { start_time: 1020, end_time: 1080, day: 5 }, // 17:00 - 18:00
  { start_time: 1080, end_time: 1140, day: 5 }, // 18:00 - 19:00
  { start_time: 1140, end_time: 1200, day: 5 }, // 19:00 - 20:00
  { start_time: 1200, end_time: 1260, day: 5 }, // 20:00 - 21:00
  { start_time: 1260, end_time: 1320, day: 5 }, // 21:00 - 22:00
  { start_time: 1320, end_time: 1380, day: 5 }, // 22:00 - 23:00
  { start_time: 420, end_time: 510, day: 5 },    // 07:00 - 08:30
  { start_time: 480, end_time: 570, day: 5 },    // 08:00 - 09:30
  { start_time: 540, end_time: 630, day: 5 },    // 09:00 - 10:30
  { start_time: 600, end_time: 690, day: 5 },    // 10:00 - 11:30
  { start_time: 660, end_time: 750, day: 5 },    // 11:00 - 12:30
  { start_time: 720, end_time: 810, day: 5 },    // 12:00 - 13:30
  { start_time: 780, end_time: 870, day: 5 },    // 13:00 - 14:30
  { start_time: 840, end_time: 930, day: 5 },    // 14:00 - 15:30
  { start_time: 900, end_time: 990, day: 5 },    // 15:00 - 16:30
  { start_time: 960, end_time: 1050, day: 5 },   // 16:00 - 17:30
  { start_time: 1020, end_time: 1110, day: 5 },  // 17:00 - 18:30
  { start_time: 1080, end_time: 1170, day: 5 },  // 18:00 - 19:30
  { start_time: 1140, end_time: 1230, day: 5 },  // 19:00 - 20:30
  { start_time: 1200, end_time: 1290, day: 5 },  // 20:00 - 21:30
  { start_time: 1260, end_time: 1350, day: 5 }, // 21:00 - 22:30
  { start_time: 1320, end_time: 1410, day: 5 }, // 22:00 - 23:30"
  { start_time: 420, end_time: 480, day: 6 },   // 07:00 - 08:00
  { start_time: 480, end_time: 540, day: 6 },   // 08:00 - 09:00
  { start_time: 540, end_time: 600, day: 6 },   // 09:00 - 10:00
  { start_time: 600, end_time: 660, day: 6 },   // 10:00 - 11:00
  { start_time: 660, end_time: 720, day: 6 },   // 11:00 - 12:00
  { start_time: 720, end_time: 780, day: 6 },   // 12:00 - 13:00
  { start_time: 780, end_time: 840, day: 6 },   // 13:00 - 14:00
  { start_time: 840, end_time: 900, day: 6 },   // 14:00 - 15:00
  { start_time: 900, end_time: 960, day: 6 },   // 15:00 - 16:00
  { start_time: 960, end_time: 1020, day: 6 },  // 16:00 - 17:00
  { start_time: 1020, end_time: 1080, day: 6 }, // 17:00 - 18:00
  { start_time: 1080, end_time: 1140, day: 6 }, // 18:00 - 19:00
  { start_time: 1140, end_time: 1200, day: 6 }, // 19:00 - 20:00
  { start_time: 1200, end_time: 1260, day: 6 }, // 20:00 - 21:00
  { start_time: 1260, end_time: 1320, day: 6 }, // 21:00 - 22:00
  { start_time: 1320, end_time: 1380, day: 6 }, // 22:00 - 23:00
  { start_time: 420, end_time: 510, day: 6 },    // 07:00 - 08:30
  { start_time: 480, end_time: 570, day: 6 },    // 08:00 - 09:30
  { start_time: 540, end_time: 630, day: 6 },    // 09:00 - 10:30
  { start_time: 600, end_time: 690, day: 6 },    // 10:00 - 11:30
  { start_time: 660, end_time: 750, day: 6 },    // 11:00 - 12:30
  { start_time: 720, end_time: 810, day: 6 },    // 12:00 - 13:30
  { start_time: 780, end_time: 870, day: 6 },    // 13:00 - 14:30
  { start_time: 840, end_time: 930, day: 6 },    // 14:00 - 15:30
  { start_time: 900, end_time: 990, day: 6 },    // 15:00 - 16:30
  { start_time: 960, end_time: 1050, day: 6 },   // 16:00 - 17:30
  { start_time: 1020, end_time: 1110, day: 6 },  // 17:00 - 18:30
  { start_time: 1080, end_time: 1170, day: 6 },  // 18:00 - 19:30
  { start_time: 1140, end_time: 1230, day: 6 },  // 19:00 - 20:30
  { start_time: 1200, end_time: 1290, day: 6 },  // 20:00 - 21:30
  { start_time: 1260, end_time: 1350, day: 6 }, // 21:00 - 22:30
  { start_time: 1320, end_time: 1410, day: 6 }, // 22:00 - 23:30"
]