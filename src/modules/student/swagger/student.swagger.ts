

const studentSwagger= {
  paths: {
    '/students': {
      get: {
        summary: 'Obter todos os estudantes',
        responses: {
          '200': {
            description: 'Operação bem-sucedida',
            content: {
              'application/json': {
                schema: {
                  type: 'array',
                  items: {
                    $ref: '#/components/schemas/Student',
                  },
                },
              },
            },
          },
        },
      },
      post: {
        summary: 'Criar um novo estudante',
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/Student',
              },
            },
          },
        },
        responses: {
          '201': {
            description: 'Operação bem-sucedida',
          },
        },
      },
    },
    '/students/{id}': {
      get: {
        summary: 'Obter um estudante por ID',
        parameters: [
          {
            name: 'id',
            in: 'path',
            required: true,
            schema: {
              type: 'integer',
            },
          },
        ],
        responses: {
          '200': {
            description: 'Operação bem-sucedida',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/Student',
                },
              },
            },
          },
        },
      },
    },
  },
  components: {
    schemas: {
      Student: {
        type: 'object',
        properties: {
          id: {
            type: 'integer',
          },
          name: {
            type: 'string',
          },
          age: {
            type: 'integer',
          },
        },
      },
    },
  },
};

export default studentSwagger;
