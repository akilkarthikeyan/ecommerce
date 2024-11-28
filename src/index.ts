import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import logger from "./utils/logger";
import { swaggerDocs, swaggerUi } from "./swagger";
import { pool } from "./db";

import userRoutes from "./routes/userRoutes";
import productRoutes from "./routes/productRoutes";
import authRoutes from "./routes/authRoutes";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// CORS
app.use(cors());
// Middleware
app.use(express.json());

// Routes
app.use("/api/users", userRoutes);
app.use("/api", authRoutes);
app.use("/api/products", productRoutes);

// Swagger
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.get("/", (req, res) => {
    res.send({
        message: "Welcome to the E-Commerce API",
        documentation: "Swagger documentation is available at /api-docs"
    });
});

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
