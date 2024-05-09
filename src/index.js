import express from 'express';
import dotenv from 'dotenv';
import productController from './product/product.controller.js';

const app = express();
dotenv.config();


//Pakai middleware bawaan express untuk membaca file json
app.use(express.json());

const port = process.env.PORT;

app.use("/products", productController);

app.listen(port, () => {
    console.log(`Express API running in port: ${port}`);
});

