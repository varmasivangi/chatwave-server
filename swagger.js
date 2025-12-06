import swaggerJsDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import path from "path";
import { fileURLToPath } from "url";

// Fix ES Module __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "ChatWave API Documentation",
      version: "1.0.0",
      description: "API docs for ChatWave backend",
    },
    servers: [
      {
        url: "http://localhost:5000",
      },
    ],
  },

  // FIX: Correct path to route files
  apis: [path.join(__dirname, "routes/*.js"), path.join(__dirname, "../routes/*.js")],
};

const swaggerSpec = swaggerJsDoc(swaggerOptions);

export const swaggerDocs = (app) => {
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

  // Also expose raw JSON (required for Angular OpenAPI)
  app.get("/api-docs-json", (req, res) => {
    res.json(swaggerSpec);
  });
};
