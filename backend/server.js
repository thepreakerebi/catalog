import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import productRoutes from "./routes/product.js";
import cors from "cors";

dotenv.config();

const app = express();
const port = process.env.PORT || 8000;

// handle cors
app.use(
  cors({
    origin: 'http://localhost:5173',
  })
);


// Middleware to parse JSON
app.use(express.json());

app.use('/api', productRoutes)

app.listen(port, () => {
    connectDB();
    console.log("server started on port " + port);
});

