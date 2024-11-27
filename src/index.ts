import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import logger from "./config/logger";
import swaggerUi from "swagger-ui-express";
import swaggerDocs from "./config/swagger";
import { pool } from "./config/db";

import userRoutes from "./routes/userRoutes";
import productRoutes from "./routes/productRoutes";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// CORS
app.use(cors());
// Middleware
app.use(express.json());

// Routes
app.use("/users", userRoutes);
app.use("/products", productRoutes);

// Swagger
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// Start the server
app.listen(PORT, async () => {
    logger.info(`Server is running on http://localhost:${PORT}`);
    try {
        await pool.query('SELECT 1');
        logger.info('Database connection established successfully');
    }
    catch (err: any) {
        logger.error('Unable to connect to the database:', err);
    }
});
