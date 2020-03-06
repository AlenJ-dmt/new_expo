import React from 'react'
import { View, Text, Image, StyleSheet, Button, TouchableOpacity } from 'react-native'

const ProductItem = props => {
    return (
        <TouchableOpacity onPress={props.onDetailView}>
        <View style={styles.product}>
            <View style = {styles.imageConatiner}>
                <Image style={styles.image} source={{ uri: props.image }} />
            </View>
            <View style={styles.details}>
                <Text style={styles.title}> {props.title} </Text>
                <Text styles={styles.price}> {props.price} </Text>
            </View>
            <View style={styles.actions}>
                <Button title='Details' onPress={props.onDetailView} />
                <Button title='To Cart' onPress={props.onAddToCart} />
            </View>
        </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    product: {
        shadowColor: 'black',
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 8,
        shadowOpacity: .26,
        elevation: 5,
        borderRadius: 10,
        backgroundColor: 'white',
        height: 300,
        margin: 20

    },
    details: {
        alignItems: 'center',
        height: '15%'
    },
    imageConatiner:{
        width: '100%',
        height: '60%',
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        overflow: "hidden"
    },
    image: {
        width: '100%',
        height: '100%'
    },
    price: {
        fontSize: 14,
        color: 'grey'
    },
    title: {
        fontSize: 18,
        marginVertical: 3,
        fontFamily: 'open-sans-bold'
    },
    actions: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: '25%',
        paddingHorizontal: 20
    }
})

export default ProductItem;