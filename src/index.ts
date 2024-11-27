import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import logger from "./config/logger";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// CORS
app.use(cors());
// Middleware
app.use(express.json());

// Example Routes
import userRoutes from "./routes/userRoutes";
import productRoutes from "./routes/productRoutes";

app.use("/users", userRoutes);
app.use("/products", productRoutes);

// Start the server
app.listen(PORT, () => {
    logger.info(`Server is running on http://localhost:${PORT}`);
});
