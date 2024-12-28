import express from "express";
import Product from "../models/product.js";

const router = express.Router();

// Helper function to capitalize each word in the product name
const capitalizeName = (name) => {
    return name
        .split(" ")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ");
};

router.post("/products", async (req, res) => {
    const { name, price, image } = req.body;

    if (!name || !price || !image) {
        return res.status(400).json({ success: false, message: "All fields are required" });
    }

    const productName = capitalizeName(name);
    const productPrice = parseFloat(price);

    // Check if a product exists with the same name or image
    const existingProduct = await Product.findOne({
        $or: [{ name: productName }, { image }],
    });

    if (existingProduct) {
        return res.status(400).json({
            success: false,
            message: "Product already exists with the same name or image",
        });
    }

    const newProduct = new Product({
        name: productName,
        price: productPrice,
        image,
    });

    try {
        await newProduct.save();
        res.status(201).json({
            success: true,
            message: "New product added",
            newProduct,
        });
    } catch (error) {
        console.log("Error adding new product:", error.message);
        res.status(500).json({
            success: false,
            message: "Error adding new product",
            error,
        });
    }
});


router.get("/products", async (req, res) => {
    try {
        const products = await Product.find();
        res.status(200).json({ success: true, products });
    } catch (error) {
        console.log("Error fetching products:", error.message);
        res.status(500).json({ success: false, message: "Error fetching products", error });
    }
});

router.delete("/products/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const product = await Product.findByIdAndDelete(id);
        if (!product) {
            return res.status(404).json({ success: false, message: "Product not found" });
        }
        res.status(200).json({ success: true, message: "Product deleted", product });
    } catch (error) {
        console.log("Error deleting product:", error.message);
        res.status(500).json({ success: false, message: "Error deleting product", error });
    }
});

// New route to delete multiple products at once
router.delete("/products", async (req, res) => {
    const { ids } = req.body; // Array of product IDs

    if (!Array.isArray(ids) || ids.length === 0) {
        return res.status(400).json({ success: false, message: "Please provide an array of product IDs" });
    }

    try {
        const deleteResult = await Product.deleteMany({ _id: { $in: ids } });
        if (deleteResult.deletedCount === 0) {
            return res.status(404).json({ success: false, message: "No products found to delete" });
        }
        res.status(200).json({
            success: true,
            message: `${deleteResult.deletedCount} products deleted`,
        });
    } catch (error) {
        console.log("Error deleting multiple products:", error.message);
        res.status(500).json({ success: false, message: "Error deleting multiple products", error });
    }
});

router.put("/products/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const { name, price, image } = req.body;

        const updatedData = {};
        if (name) updatedData.name = capitalizeName(name);
        if (price) updatedData.price = parseFloat(price) || price;
        if (image) updatedData.image = image;

        // Check for existing product with the same name or image, excluding the current product
        const conflictingProduct = await Product.findOne({
            $or: [{ name: updatedData.name }, { image: updatedData.image }],
            _id: { $ne: id }, // Exclude the current product being updated
        });

        if (conflictingProduct) {
            return res.status(400).json({
                success: false,
                message: "A product with the same name or image already exists.",
            });
        }

        // Update the product
        const product = await Product.findByIdAndUpdate(id, updatedData, { new: true });
        if (!product) {
            return res.status(404).json({ success: false, message: "Product not found" });
        }
        res.status(200).json({ success: true, message: "Product updated", product });
    } catch (error) {
        console.log("Error updating product:", error.message);
        res.status(500).json({ success: false, message: "Error updating product", error });
    }
});

export default router;