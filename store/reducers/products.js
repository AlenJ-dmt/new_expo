import PRODUCTS from '../../data/dummy-data'

const initialState = {
    availableProducts : PRODUCTS,
    //we filter the user products to show the only with the ID of the user at the mometn
    userProducts : PRODUCTS.filter(prod => prod.ownerId === 'u1')
//User products are the products the user create with his unique ID
};

export default(state = initialState, action) => {
    return state;
};