const YAML = require("yamljs");
const path = require("path");

const authDoc = YAML.load(path.join(__dirname, "./swagger/auth.yaml"));
const moviesDoc = YAML.load(path.join(__dirname, "./swagger/movies.yaml"));

const swaggerDoc = {
  openapi: "3.0.0",
  info: {
    title: "MovieTracker API",
    version: "1.0.0",
    description: "API documentation for MovieTracker",
  },
  servers: [
    {
      url: "http://localhost:3000/api/v1",
      description: "Local server",
    },
  ],
  components: {
    securitySchemes: {
      bearerAuth: {
        type: "http",
        scheme: "bearer",
        bearerFormat: "JWT",
      },
    },
  },
  security: [{ bearerAuth: [] }],
  tags: [
    { name: "Auth", description: "User authentication" },
    { name: "Movies", description: "Movie management" },
  ],
  paths: {
    ...authDoc.paths,
    ...moviesDoc.paths,
  },
};

module.exports = swaggerDoc;
