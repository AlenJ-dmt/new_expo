import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, Button, ActivityIndicator } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import CartItem from '../../components/Shop/CartItem';
import Card from '../../components/UI/Card';
import * as cartActions from '../../store/actions/Cart';
import * as orderActions from '../../store/actions/Orders';

const CartScreen = () => {

    const [isLoading, setIsLoading] = useState(false)

    const cartTotalAmount = useSelector(state => state.cart.totalAmount)
    const cartItems = useSelector(state => {
        const transformCartItems = [];
        for (const key in state.cart.items) {
            transformCartItems.push({
                productId: key,
                productTitle: state.cart.items[key].productTitle,
                productPrice: state.cart.items[key].productPrice,
                quantity: state.cart.items[key].quantity,
                sum: state.cart.items[key].sum
            });
        }
        return transformCartItems.sort((a, b) =>
            a.productId > b.productId ? 1 : -1);
    })

    const dispatch = useDispatch();

    const sendOrderHandler = async () => {
        setIsLoading(true);
        await dispatch(orderActions.addOrder(cartItems, cartTotalAmount));
        setIsLoading(false);
    }

    return (
        <View style={styles.screen}>
            <Card style={styles.summary}>
                <Text style={styles.sumatyText}>Total:</Text>
                <Text style={styles.amount}>$ {Math.round(cartTotalAmount.toFixed(2) * 100 / 100)}</Text>
                {isLoading ? (<ActivityIndicator size={'small'} />) : (
                    <Button
                        title="Order now"
                        disabled={cartItems.length === 0}
                        onPress={sendOrderHandler}
                    />)}
            </Card>
            <FlatList
                data={cartItems}
                keyExtractor={item => item.productId}
                renderItem={itemData =>
                    <CartItem
                        quantity={itemData.item.quantity}
                        title={itemData.item.title}
                        amount={itemData.item.sum}
                        deletable
                        onRemove={() => {
                            dispatch(cartActions.removeFromCart(itemData.item.productId))
                        }}
                    />}
            />


        </View>
    )
};

const styles = StyleSheet.create({
    screen: {
        margin: 20
    },
    summary: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 20,
        padding: 10
    },
    summaryText: {
        fontFamily: 'open-sans-bold',
        fontSize: 18
    },
    amount: {
        color: 'black'
    }
})

export default CartScreen;