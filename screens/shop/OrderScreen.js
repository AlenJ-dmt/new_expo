import React from 'react';
import { FlatList, Text } from 'react-native';
import { useSelector } from 'react-redux';
import { HeaderButtons, Item } from 'react-navigation-header-buttons'
import HeaderButton from '../../components/UI/HeaderButton'
import OrderItem from '../../components/Shop/OrderItem'

const OrderScreen = props => {

    const orders = useSelector(state => state.orders.orders);
    return (
        <FlatList
            data={orders}
            renderItem={itemData =>
                <OrderItem
                    amount={itemData.item.totalAmount}
                    date={itemData.item.readableDate}
                    items = {itemData.item.items}
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

export default OrderScreen;