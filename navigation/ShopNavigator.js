import React from 'react';
import { NavigationContainer, DrawerActions } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { Platform } from 'react-native'

import OrderScreen, { orderScreenOptions } from '../screens/shop/OrderScreen';
import ProductDetailsScreen from '../screens/shop/ProductDetailsScreen';
import ProductsOverviewScreen, { screenOptions } from '../screens/shop/ProductsOverviewScreen';
import CartScreen from '../screens/shop/CartScreen'
import UserProductScreen, { UserScreenOptions } from '../screens/user/UserProductScreen'
import EditProductScreen, { editProductOptions } from '../screens/user/EditProductScreen'

const MyProductsOverViewScreen = createStackNavigator()
const ShopDrawerNavigator = createDrawerNavigator()
const MyOrdersNavigator = createStackNavigator()
const MyUserProductScreenNavigator = createStackNavigator()

const AdminNavigator = () => {
    return (
        <MyUserProductScreenNavigator.Navigator>
            <MyUserProductScreenNavigator.Screen
                name='Admin'
                component={UserProductScreen}
                options={UserScreenOptions}
            />
            <MyUserProductScreenNavigator.Screen
                name='Edit'
                component={EditProductScreen}
                options={editProductOptions}
            />
        </MyUserProductScreenNavigator.Navigator>
    )
}

const OrdersNavigator = () => {
    return (
        <MyOrdersNavigator.Navigator>
            <MyOrdersNavigator.Screen
                name='Orders'
                component={OrderScreen}
                options={orderScreenOptions}
            />
        </MyOrdersNavigator.Navigator>
    )
}


const ShopNavigator = () => {
    return (
        <NavigationContainer>
            <ShopDrawerNavigator.Navigator>
                <ShopDrawerNavigator.Screen
                    name='ProductsOverview'
                    component={ProductsOverViewNav}
                />
                <ShopDrawerNavigator.Screen
                    name='Orders'
                    component={OrdersNavigator}
                />
                <ShopDrawerNavigator.Screen
                    name='Admin'
                    component={AdminNavigator}
                />
            </ShopDrawerNavigator.Navigator>
        </NavigationContainer>
    );
};

const ProductsOverViewNav = props => {
    return (
        <MyProductsOverViewScreen.Navigator>
            <MyProductsOverViewScreen.Screen
                name='ProductsOverview'
                component={ProductsOverviewScreen}
                options={screenOptions}
            />
            <MyProductsOverViewScreen.Screen
                name='Product Details'
                component={ProductDetailsScreen}
            />
            <MyProductsOverViewScreen.Screen
                name='Cart'
                component={CartScreen}
            />
        </MyProductsOverViewScreen.Navigator>
    );
};

export default ShopNavigator;