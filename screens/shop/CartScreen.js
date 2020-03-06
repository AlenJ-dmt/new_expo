import React from 'react';
import { View, Text, StyleSheet, FlatList, Button } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import CartItem from '../../components/Shop/CartItem';
import * as cartActions from '../../store/actions/Cart';


const CartScreen = () => {

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

    return (
        <View style={styles.screen}>
            <View style={styles.summary}>
                <Text style={styles.sumatyText}>Total:</Text>
                <Text style={styles.amount}>$ {cartTotalAmount.toFixed(2)}</Text>
                <Button
                    title="Order now"
                    disabled={cartItems.length === 0}
                />
            </View>
            <FlatList
                data={cartItems}
                keyExtractor={item => item.productId}
                renderItem={itemData =>
                    <CartItem
                    quantity ={ itemData.item.quantity}
                    title = {itemData.item.title}
                    amount = {itemData.item.sum}
                    onRemove = {() => {
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
        padding: 10,
        shadowColor: 'black',
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 8,
        shadowOpacity: .26,
        elevation: 5,
        borderRadius: 10,
        backgroundColor: 'white',
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