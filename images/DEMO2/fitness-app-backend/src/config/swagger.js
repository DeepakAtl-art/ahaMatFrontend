import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Fitness App API',
      version: '1.0.0',
      description: 'API documentation for Fitness App with JWT Auth & Workout Management',
    },
    servers: [
      {
        url: 'http://localhost:5000/api',
        description: 'Local server',
      },
    ],
    components: {
      securitySchemes: {
        BearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
    },
    security: [{ BearerAuth: [] }],
  },
  apis: ['./src/routes/*.js'], // Adjust path based on your structure
};

const swaggerSpec = swaggerJsdoc(options);

const swaggerDocs = (app) => {
  app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
  app.get('/api/docs-json', (req, res) => {
    res.json(swaggerSpec);
  });
  console.log('📄 Swagger API Docs available at: http://localhost:5000/api/docs');
};

export default swaggerDocs;
