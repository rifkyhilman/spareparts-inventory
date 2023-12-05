const { findProducts, findProductById, insertProduct, deleteProduct, editProduct } = require("./product.repository");

const getAllProducts = async() => {
    const product = await findProducts();

    return product;
};

const getProductById = async(id) => {
    if(typeof id !== "number"){
        throw Error("ID is not a number");
    }

    const product = await findProductById(id);

    if(!product){
        throw new Error("Product not found")
    }

    return product;
};

const createProduct = async(newProductData) => {
    const product = await insertProduct(newProductData);

    return product;
};

const deletProductById = async(id) => {

    await getProductById(id);

    await deleteProduct(id);
};

const editProductById = async(id, productData) => {
    await getProductById(id);

    const product = await editProduct(id, productData);

    return product;
};

module.exports = {
    getAllProducts,
    getProductById,
    createProduct,
    deletProductById,
    editProductById
};