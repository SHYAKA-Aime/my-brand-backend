const swaggerJsdoc = require('swagger-jsdoc');
const options = {
    definition: {
      openapi: '3.0.0',
      info: {
        title: "MyBrand API",
        version: '1.0.0',
        description: "API documentation for MyBrand application",
      },
      servers: [
        {
          url: 'http://localhost:4000/api',
          description: 'Development server',
        },
      ],
      components: {
        schemas: {
            User: {
                type: 'object',
                properties: {
                  Name: { type: 'string' },
                  Email: { type: 'string' },
                  Password: { type: 'string' },
                },
              },
          Blog: {
            type: 'object',
            properties: {
              title: { type: 'string' },
              description: { type: 'string' },
              image: { type: 'string' },
            },
          },
          ContactMessage: {
            type: 'object',
            properties: {
              name: { type: 'string' },
              email: { type: 'string' },
              subject: { type: 'string' },
              message: { type: 'string' },
            },
          },
        },
      },
    },
    apis: ['./src/routes/*.ts'], // Path to your API implementation file
  };
  
const specs = swaggerJsdoc(options);

module.exports = specs;