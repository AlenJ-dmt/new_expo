import React, { useEffect, useState, useCallback } from 'react';;
import { FlatList, Button, ActivityIndicator, View, StyleSheet, Text } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import ProductItem from '../../components/Shop/ProductItem';
import * as cartActions from '../../store/actions/Cart';
import * as productActions from '../../store/actions/products'
import { HeaderButtons, Item } from 'react-navigation-header-buttons'
import HeaderButton from '../../components/UI/HeaderButton'




const ProductsOverviewScreen = props => {

    const [isLoading, setIsLoading] = useState(false);
    const [isRefreshing, setIsRefreshing] = useState(false);
    const [error, setError] = useState();

    const products = useSelector(state => state.products.availableProducts);
    //use selector get a function with the adress of the info you want to acess
    // state is the whole info .products name of the combine reducers in the app.js and 
    // .available products acces the reducers from the store reducer folder

    const dispatch = useDispatch();

    const loadProducts = useCallback(async () => {
        setError(null);
        setIsRefreshing(true);
        try {
            await dispatch(productActions.fetchProducts());
        } catch (err) {
            setError(err.message)
        }
        setIsRefreshing(false);
    }, [dispatch, setIsLoading, setError]);

    useEffect(() => {
        const willFocusSub = props.navigation.addListener('willFocus', loadProducts);
        return () => {
            willFocusSub.remove();
        }
    }, [loadProducts])

    useEffect(() => {
        setIsLoading(true);
        loadProducts().then(() => {
            setIsLoading(false);
        });
    }, [dispatch, loadProducts]);

    const editProductHandler = (id) => {
        props.navigation.navigate('Product Details', { productId: id });
    };

    if (error) {
        return (
            < View style={styles.centered} >
                <Text>An error ocurred!</Text>
                <Button title='Try Again' onPress={loadProducts} />
            </View >
        );
    }

    if (isLoading) {
        <View style={styles.centered}>
            <ActivityIndicator size='large' />
        </View>
    }

    if (!isLoading && products.length === 0) {
        <View style={styles.centered}>
            <Text>No Products Found</Text>
        </View>
    }

    return (
        <FlatList
            onRefresh={loadProducts}
            refreshing = {isRefreshing}
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

const styles = StyleSheet.create({
    centered: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
})

export default ProductsOverviewScreen;