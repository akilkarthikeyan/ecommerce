import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import logger from "./utils/logger";
import { swaggerDocs, swaggerUi } from "./swagger";

import userRoutes from "./routes/userRoutes";
import productRoutes from "./routes/productRoutes";
import authRoutes from "./routes/authRoutes";
import cartRoutes from "./routes/cartRoutes";

dotenv.config();

const app = express();

// CORS
app.use(cors());
// Middleware
app.use(express.json());
// Public folder
app.use(express.static(__dirname + "/public"));

// Routes
app.use("/api/users", userRoutes);
app.use("/api", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/cart", cartRoutes);

// Swagger
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// Start the server
app.listen(process.env.PORT, async () => {
    logger.info(`Server is running on ${process.env.HOST}:${process.env.PORT}`);
});

