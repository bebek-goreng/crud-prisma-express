//Handle request, response, dan validasi
import express from "express";
import { getAllProducts, getProductById, createProduct, deleteProductById, editProductById } from "./product.services.js";

const router = express.Router();

router.get("/", async (req, res) => {
    try {
        const products = await getAllProducts();

        res.send(products);
    } catch (error) {
        res.status.send(error.message);
    }
});

router.get("/:id", async (req, res) => {
    try {
        const productId = req.params.id;
        const product = await getProductById(productId);

        res.status(200).send(product);
    } catch (error) {
        res.status(400).send(error.message);
    }
});

router.post("/", async (req, res) => {
    try {
        const newProductData = req.body;

        const product = await createProduct(newProductData);

        res.status(201).send({
            data: product,
            message: "Success create product!"
        });
    } catch (error) {
        res.status(400).send(error.message);
    }
});

router.delete("/:id", async (req, res) => {
    try {
        const productId = req.params.id;

        await deleteProductById(productId)

        res.send("Product successfully deleted")
    } catch (error) {
        res.status(400).send(error.message);
    }
});

router.put("/:id", async (req, res) => {
    try {
        const productId = req.params.id;
        const productData = req.body;

        if (
            !(
                productData.name &&
                productData.price &&
                productData.category &&
                productData.description &&
                productData.image
            )
        ) {
            res.send("There is a missing field");
        }
        const product = await editProductById(productId, productData);
        console.log(product);

        res.send({
            data: product,
            message: "Product has been successfully edited",
        });
    } catch (error) {
        res.status(400).send(error.message);
    }
});

router.patch("/:id", async (req, res) => {
    try {
        const productId = req.params.id;
        const productData = req.body;

        const product = await editProductById(productId, productData);

        res.send({
            data: product,
            message: "Product has been successfully edited",
        });
    } catch (error) {
        res.status(400).send(error.message)
    }
});


export default router;