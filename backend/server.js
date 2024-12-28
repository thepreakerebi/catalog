import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import productRoutes from "./routes/product.js";

dotenv.config();

const app = express();

// Middleware to parse JSON
app.use(express.json());

app.use('/api', productRoutes)

app.listen(8000, () => {
    connectDB();
    console.log("server started on port 8000");
});

