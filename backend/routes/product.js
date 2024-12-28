import express from "express";
import { getProducts, addProduct, deleteProduct, deleteProducts, updateProduct, getProduct } from "../controllers/product.js";

const router = express.Router();

// route to add new product
router.post("/products", addProduct);

// route to get all products
router.get("/products", getProducts);

// route to get a single product
router.get("/products/:id", getProduct);


// route to delete a product
router.delete("/products/:id", deleteProduct);

// New route to delete multiple products at once
router.delete("/products", deleteProducts);

// route to update a product
router.patch("/products/:id", updateProduct);

export default router;