import PRODUCTS from '../../data/dummy-data'
import { DELETE_PRODUCT, UPDATE_PRODUCT, CREATE_PRODUCT, SET_PRODUCTS } from '../actions/products';
import Product from '../../models/product'

const initialState = {
    availableProducts: PRODUCTS,
    //we filter the user products to show the only with the ID of the user at the mometn
    userProducts: PRODUCTS.filter(prod => prod.ownerId === 'u1')
    //User products are the products the user create with his unique ID
};

export default (state = initialState, action) => {
    switch (action.type) {
        case SET_PRODUCTS:
            return{
                availableProducts: action.products,
                userProducts: action.products.filter(prod => prod.ownerId === 'u1')
            }

        case CREATE_PRODUCT:
            const newProduct = new Product(
                action.productData.id,
                'u1',
                action.productData.title,
                action.productData.imageUrl,
                action.productData.description,
                action.productData.price
            );
            return {
                ...state,
                availableProducts: state.availableProducts.concat(newProduct),
                userProducts: state.userProducts.concat(newProduct)
            };

        case UPDATE_PRODUCT:
            const productIndex = state.userProducts.findIndex(
                prod => prod.id === action.pid
            );
            const updatedProduct = new Product(
                action.pid,
                state.userProducts[productIndex].ownerId,
                action.productData.title,
                action.productData.imageUrl,
                action.productData.description,
                state.userProducts[productIndex].price
            );

            const updatedUserProducts = [...state.userProducts];
            updatedUserProducts[productIndex] = updatedProduct;

            const availableProductsIndex = state.availableProducts.findIndex(
                prod => prod.id === action.pid
            );

            const updatedAvailableProducts = [...state.availableProducts];
            updatedAvailableProducts[availableProductsIndex] = updatedProduct;
            return{
                ...state,
                availableProducts: updatedAvailableProducts,
                userProducts: updatedUserProducts
            }

        case DELETE_PRODUCT:
            return {
                ...state,
                userProducts: state.userProducts.filter(
                    product => product.id !== action.pid
                ),
                availableProducts: state.availableProducts.filter(
                    product => product.id !== action.pid
                )
            }
    }
    return state;
};