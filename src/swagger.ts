import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from "swagger-ui-express";
import dotenv from "dotenv";

dotenv.config();

const options: swaggerJsdoc.Options = {
  definition: {
    openapi: '3.0.0',  // OpenAPI version
    info: {
      title: 'E-Commerce API',
      version: '1.0.0',
      description: 'API documentation for the E-Commerce platform',
    },
    servers: [
      {
        url: `${process.env.HOST}:${process.env.PORT}`,
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
    }
  },
  apis: ['./src/routes/*.ts'],
};

const swaggerDocs = swaggerJsdoc(options);

export { swaggerUi, swaggerDocs };