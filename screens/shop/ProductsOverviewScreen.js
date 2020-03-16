import React from 'react';;
import { FlatList, Button } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import ProductItem from '../../components/Shop/ProductItem';
import * as cartActions from '../../store/actions/Cart'
import { HeaderButtons, Item } from 'react-navigation-header-buttons'
import HeaderButton from '../../components/UI/HeaderButton'




const ProductsOverviewScreen = props => {

    const products = useSelector(state => state.products.availableProducts);
    //use selector get a function with the adress of the info you want to acess
    // state is the whole info .products name of the combine reducers in the app.js and 
    // .available products acces the reducers from the store reducer folder

    const dispatch = useDispatch();

    const editProductHandler = (id) => {
        props.navigation.navigate('Product Details', { productId: id });
    };

    return (
        <FlatList
            data={products}
            renderItem={itemData =>
                <ProductItem
                    title={itemData.item.title}
                    price={itemData.item.price}
                    image={itemData.item.imageUrl}
                    onSelect={() => {
                        editProductHandler(itemData.item.id)
                    }}
                >
                    <Button
                        title='View Detail'
                        onPress={() => {
                            editProductHandler(itemData.item.id)
                        }}
                    />
                    <Button
                        title='To Cart'
                        onPress={() => {
                            dispatch(cartActions.addToCart(itemData.item))
                        }}
                    />
                </ProductItem>
            }
        />
    );
};

export const screenOptions = navData => {
    return {
        headerTitle: 'All Products',
        headerRight: () => (<HeaderButtons HeaderButtonComponent={HeaderButton}>
            <Item title='Cart' iconName='ios-cart'
                onPress={() => {
                    navData.navigation.navigate('Cart')
                }} />
        </HeaderButtons>
        ),
        headerLeft: () => (<HeaderButtons HeaderButtonComponent={HeaderButton}>
            <Item title='Menu' iconName='ios-menu'
                onPress={() => {
                    navData.navigation.toggleDrawer();
                }} />
        </HeaderButtons>
        )
    }
}

export default ProductsOverviewScreen;