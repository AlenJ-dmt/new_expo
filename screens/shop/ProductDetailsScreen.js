import React from 'react'
import { View, Text, StyleSheet, ScrollView, Button, Image, TextComponent } from 'react-native'
import { useSelector, useDispatch } from 'react-redux'
import ProductsOverviewScreen from './ProductsOverviewScreen'
import * as cartActions from '../../store/actions/Cart';

const ProductDetailsScreen = props => {

    const dispatch = useDispatch();
    
    const productId = props.route.params.productId;
    const selectedProduct = useSelector(state =>
        state.products.availableProducts.find(product => product.id === productId))
    
    return (
        <ScrollView>
            <Image style={styles.image} source = {{uri: selectedProduct.imageUrl}} />
            <Button title = 'add To Cart'onPress={() => {
                dispatch(cartActions.addToCart(selectedProduct));
            }} />
            <Text style ={styles.price} >$ {selectedProduct.price.toFixed(2)} </Text>
            <Text style = {styles.description}> {selectedProduct.description} </Text>
        </ScrollView>
    )
}

export const detailScreenOptions = navData => {
    return {
        headerTitle: selectedProduct.title
    };
};


const styles = StyleSheet.create({
    image:{
        width: '100%',
        height: 300
    },
    price:{
        fontSize: 20,
        textAlign: 'center',
        marginVertical: 20,
        fontFamily: 'open-sans-bold'
    },
    description:{
        fontSize: 14,
        textAlign:'center',
        marginHorizontal:20,
        fontFamily: 'open-sans'
    }
})
export default ProductDetailsScreen;