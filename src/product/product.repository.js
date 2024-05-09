//Komunikasi dengan database

import { prisma } from "../db/index.js"

const findProducts = async () => {
    const product = await prisma.product.findMany();

    return product;
};

const findProductById = async (id) => {
    const product = await prisma.product.findUnique({
        where: {
            id,
        },
    });

    return product;
};

const findProductByName = async (name) => {
    const product = await prisma.product.findFirst({
        where: {
            name,
        }
    });

    return product;
};

const insertProduct = async (productData) => {
    const product = await prisma.product.create({
        data: {
            name: productData.name,
            price: productData.price,
            category: productData.category,
            description: productData.description,
            image: productData.image,
        },
    });

    return product;
}

const deleteProduct = async (id) => {
    await findProductById(id);

    const product = await prisma.product.delete({
        where: {
            id,
        }
    });
};

const editProduct = async (id, productData) => {
    const product = await prisma.product.update({
        where: {
            id,
        },
        data: {
            name: productData.name,
            price: productData.price,
            category: productData.category,
            description: productData.description,
            image: productData.image,
        },
    });

    return product;
};


export {
    findProducts,
    findProductById,
    findProductByName,
    insertProduct,
    deleteProduct,
    editProduct,
}