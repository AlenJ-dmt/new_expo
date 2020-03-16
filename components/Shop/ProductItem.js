import React from 'react'
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native'
import Card from '../UI/Card'

const ProductItem = props => {
    return (
        <TouchableOpacity onPress={props.onSelect}>
        <Card style={styles.product}>
            <View style = {styles.imageConatiner}>
                <Image style={styles.image} source={{ uri: props.image }} />
            </View>
            <View style={styles.details}>
                <Text style={styles.title}> {props.title} </Text>
                <Text styles={styles.price}> {props.price} </Text>
            </View>
            <View style={styles.actions}>
                {props.children}
            </View>
        </Card>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    product: {
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