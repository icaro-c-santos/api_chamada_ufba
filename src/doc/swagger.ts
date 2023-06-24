import studentSwagger from "../modules/student/swagger/student.swagger";


export const swaggerDocument = {
  openapi: "3.0.0",
  info: {
    version: "1.0.0",
    title: "API De documentaçaõ do back end do projeto chamada",
    description:
      "Essa documentação tem como objetivo servir de contraro e apoio aos desenvolvedores do back e front end do projeto chamada",
  },
  host: "localhost:5000",
  basePath: "/",
  paths: {
    ...studentSwagger.paths
  },
  components: { ...studentSwagger.components }


};
