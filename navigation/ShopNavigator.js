import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Platform } from 'react-native'

import ProductDetailsScreen from '../screens/shop/ProductDetailsScreen';
import ProductsOverviewScreen, { screenOptions } from '../screens/shop/ProductsOverviewScreen';
import CartScreen from '../screens/shop/CartScreen'

const MyProductsOverViewScreen = createStackNavigator()


const ProductsOverViewNav = props => {
    return (
        <NavigationContainer>
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
        </NavigationContainer>
    );
};

export default ProductsOverViewNav;