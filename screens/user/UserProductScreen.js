import React from 'react'
import { FlatList, Button, Alert } from 'react-native'
import { useSelector, useDispatch } from 'react-redux'
import ProductItem from '../../components/Shop/ProductItem'
import { HeaderButtons, Item } from 'react-navigation-header-buttons'
import HeaderButton from '../../components/UI/HeaderButton'
import * as productsActions from '../../store/actions/products'

const UserProductScreen = props => {

    const userProducts = useSelector(state => state.products.userProducts)

    const dispatch = useDispatch()

    const editProductHandler = (id) => {
        props.navigation.navigate('Edit', { productId: id });
    }

    const deleteHandler = (id) => {
        Alert.alert('Are you sure?', 'do you really want to delete this item?', [
            { text: 'No', style: 'default' },
            {
                text: 'Yes',
                style: 'destructive',
                onPress: () => {
                    dispatch(productsActions.deleteProduct(id));
                }
            }
        ]);
    }

    return (
        <FlatList
            data={userProducts}
            keyExtractor={item => item.id}
            renderItem={
                itemData => <ProductItem
                    image={itemData.item.imageUrl}
                    title={itemData.item.title}
                    price={itemData.item.price}
                    onSelect={() => {
                        editProductHandler(itemData.item.id)
                    }}
                >
                    <Button
                        title='Edit'
                        onPress={() => {
                            editProductHandler(itemData.item.id)
                        }}
                    />
                    <Button
                        title='Delete'
                        onPress={deleteHandler.bind(this, itemData.item.id)}
                    />
                </ProductItem>

            }
        />
    )
}

export const UserScreenOptions = navData => {
    return {
        headerLeft: () => (<HeaderButtons HeaderButtonComponent={HeaderButton}>
            <Item title='Menu' iconName='ios-menu'
                onPress={() => {
                    navData.navigation.toggleDrawer();
                }} />
        </HeaderButtons>
        ),
        headerRight: () => (<HeaderButtons HeaderButtonComponent={HeaderButton}>
            <Item title='Add' iconName='ios-create'
                onPress={() => {
                    navData.navigation.navigate('Edit')
                }} />
        </HeaderButtons>
        )
    }
}

export default UserProductScreen;