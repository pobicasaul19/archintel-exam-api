const swaggerJSDoc = require('swagger-jsdoc');

const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Writer/Editor Dashboard Site API Documentation',
      version: '1.0.0',
      description: 'Automatically generated API documentation.',
    },
    components: {
      securitySchemes: {
        BearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
          description: 'Enter your token in the format: Bearer <token>',
        },
      },
    },
    security: [
      {
        BearerAuth: [],
      },
    ],
  },
  apis: ['./routes/**/*.js'],
};

const swaggerInfo = swaggerJSDoc(swaggerOptions);

module.exports = swaggerInfo;
