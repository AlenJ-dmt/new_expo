import React, { useEffect, useState } from 'react';
import { FlatList, View, ActivityIndicator, StyleSheet } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { HeaderButtons, Item } from 'react-navigation-header-buttons'
import HeaderButton from '../../components/UI/HeaderButton'
import OrderItem from '../../components/Shop/OrderItem'
import * as orderActions from '../../store/actions/Orders'

const OrderScreen = props => {

    const [isLoading, setIsLoading] = useState(false)
    const orders = useSelector(state => state.orders.orders);
    const dispatch = useDispatch();

    useEffect (() => {
        setIsLoading(true);
        dispatch(orderActions.fetchOrders()).then(() => {
            setIsLoading(false);
        })
    }, [dispatch])

    if (isLoading) {
        return (
            <View style={styles.centered}>
                <ActivityIndicator size={'small'} />
            </View>
        )
    }
    return (
        <FlatList
            data={orders}
            renderItem={itemData =>
                <OrderItem
                    amount={itemData.item.totalAmount}
                    date={itemData.item.readableDate}
                    items={itemData.item.items}
                />}
        />
    )
}

export const orderScreenOptions = navData => {
    return {
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
        justifyContent: 'center',
        alignItems: 'center'
    }
})

export default OrderScreen;