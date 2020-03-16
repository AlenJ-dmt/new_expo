import React, { useState } from 'react'
import { View, Text, Button, StyleSheet } from 'react-native'
import CartItem from './CartItem'
import Card from '../UI/Card'

const OrderItem = props => {

    const [showDetails, setShowDetails] = useState(false);

    return (
        <Card style={styles.orderItem}>
            <View style={styles.summary}>
                <Text style={styles.totalAmount}> {props.amount.toFixed(2)} </Text>
                <Text style={styles.date}> {props.date} </Text>
            </View>
            <Button title={showDetails? 'Hide Details': 'Show Deatils'} onPress={() => {
                setShowDetails(prevState => !prevState)
            }} />

            {showDetails && 
            <View style = {styles.detailItem} >
                {props.items.map(cartItem =>
                    <CartItem
                        key = {cartItem.productId}
                        quantity={cartItem.quantity}
                        title={cartItem.productTitle}
                        amount={cartItem.sum}
                    />)}
            </View>}
        </Card>
    );
};

const styles = StyleSheet.create({
    orderItem: {
        margin: 20,
        padding: 10
    },
    summary: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%'
    },
    totalAmount: {
        fontFamily: 'open-sans-bold',
        fontSize: 16
    },
    date: {
        fontFamily: 'open-sans',
        fontSize: 16,
        color: '#888'
    },
    detailItem:{
        width: '100%'
    }
})
export default OrderItem;