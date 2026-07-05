const swaggerJsdoc = require("swagger-jsdoc");

const swaggerSpec = swaggerJsdoc({
    definition: {
        openapi: "3.0.0",
        info: {
            title: "MERN Project API",
            version: "1.0.0",
            description: "User CRUD API with JWT authentication and relational data (address, roles, courses).",
        },
        servers: [
            { url: "http://localhost:" + (process.env.PORT || 3000) },
        ],
        components: {
            securitySchemes: {
                cookieAuth: {
                    type: "apiKey",
                    in: "cookie",
                    name: "Session",
                },
            },
            schemas: {
                Error: {
                    type: "object",
                    properties: {
                        error: { type: "string" },
                    },
                },
                User: {
                    type: "object",
                    properties: {
                        userId: { type: "string" },
                        userName: { type: "string" },
                    },
                },
            },
        },
    },
    apis: ["./routes/*.js"],
});

module.exports = swaggerSpec;
