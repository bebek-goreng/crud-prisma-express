//Untuk handle logic

import { findProductById, findProductByName, findProducts, insertProduct, deleteProduct, editProduct } from "./product.repository.js";

const getAllProducts = async () => {
    const products = await findProducts();

    //Untuk query manual bisa menggunakan ini
    // prisma.$executeRaw()

    return products;
};

const getProductById = async (id) => {
    const product = await findProductById(id);

    if (!product) {
        throw new Error("Product not found");
    }

    return product;
};

const createProduct = async (newProductData) => {
    const findProduct = await findProductByName(newProductData.name)

    if (findProduct) {
        throw new Error("Poduct already exist");
    }

    const product = await insertProduct(newProductData);

    return product;
};

const deleteProductById = async (id) => {
    await getProductById(id);

    await deleteProduct(id);

    return;
}

const editProductById = async (id, productData) => {
    await getProductById(id);

    const product = await editProduct(id, productData);

    return product;
}


export {
    getAllProducts,
    getProductById,
    createProduct,
    deleteProductById,
    editProductById
};