import React, { useState, useReducer, useCallback, useEffect } from 'react'
import { View, ScrollView, StyleSheet, Alert, KeyboardAvoidingView, ActivityIndicator } from 'react-native'
import { HeaderButtons, Item } from 'react-navigation-header-buttons'
import HeaderButton from '../../components/UI/HeaderButton'
import { useSelector, useDispatch } from 'react-redux'
import * as productActions from '../../store/actions/products'
import Input from '../../components/UI/Input'
import ImgPicker from '../../components/UI/ImagePicker'

const FORM_INPUT_UPDATE = 'FORM_INPUT_UPDATE';

const formReducer = (state, action) => {
    if (action.type === FORM_INPUT_UPDATE) {
        const updatedValues = {
            ...state.inputValues,
            [action.input]: action.value
        };
        const updatedValidities = {
            ...state.updatedValidities,
            [action.input]: action.isValid
        }
        let updatedFormIsValid = true;
        for (const key in updatedValidities) {
            updatedFormIsValid = updatedFormIsValid && updatedValidities[key];
        }
        return {
            formIsValid: updatedFormIsValid,
            inputValidities: updatedValidities,
            inputValues: updatedValues
        };
    }
    return state;
};

const EditProductScreen = props => {

    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState();

    const prodId = props.route.params ? props.route.params.productId : null;

    const editedProduct = useSelector(state =>
        state.products.userProducts.find(prod => prod.id === prodId)
    );

    const dispatch = useDispatch()

    const [formState, dispatchFormState] = useReducer(formReducer, {
        inputValues: {
            title: editedProduct ? editedProduct.title : '',
            imageUrl: editedProduct ? editedProduct.imageUrl : '',
            description: editedProduct ? editedProduct.description : '',
            price: ''
        },
        inputValidities: {
            title: editedProduct ? true : false,
            imageUrl: editedProduct ? true : false,
            description: editedProduct ? true : false,
            price: editedProduct ? true : false
        }
    })

    useEffect(() => {
        if (error) {
            Alert.alert('An error ocurred', error, [{ text: 'Okay' }])
        }
    }, [error])

    const submitHandler = useCallback(async () => {
        if (!formState.formIsValid) {
            Alert.alert('Wrong Input!', 'Please check the errors in the form', [
                { text: 'Okay' }
            ]);
            return;
        }
        setError(null)
        setIsLoading(true)
        try {
            if (editedProduct) {
                await dispatch(productActions.updateProduct(
                    prodId,
                    formState.inputValues.title,
                    formState.inputValues.description,
                    formState.inputValues.imageUrl
                )
                );
            }
            else {
                await dispatch(productActions.createProduct(
                    formState.inputValues.title,
                    formState.inputValues.description,
                    formState.inputValues.imageUrl,
                    +formState.inputValues.price
                )
                )
            }
            props.navigation.goBack()
        } catch (err) {
            setError(err.message);
        }
        setIsLoading(false)
    }, [dispatch, prodId, formState])

    useEffect(() => {
        props.navigation.setParams({ submit: submitHandler });
    }, [submitHandler]);

    const inputChangeHandler = useCallback((inputIdentifier, inputValue, inputValidity) => {

        dispatchFormState({
            type: FORM_INPUT_UPDATE,
            value: inputValue,
            isValid: inputValidity,
            input: inputIdentifier
        })
    }, [dispatchFormState])

    if (isLoading) {
        <View style={styles.centered}>
            <ActivityIndicator size='large' />
        </View>
    }

    return (

        <KeyboardAvoidingView
            style={{ flex: 1 }}
            keyboardVerticalOffset={100}
            behavior='padding'
        >
            <ScrollView>
                <View style={styles.form}>
                    <Input
                        id='title'
                        label='Title'
                        errorText='Please enter a valid Title'
                        keyboardType='default'
                        autoCapitalize='words'
                        autoCorrect
                        returnKeyType='next'
                        onInputChange={inputChangeHandler}
                        initialValue={editedProduct ? editedProduct.title : ''}
                        initiallyValid={!!editedProduct}
                        required
                    />
                    <Input
                        id='imageUrl'
                        label='Image URL'
                        errorText='Please enter a valid Image Url'
                        keyboardType='default'
                        returnKeyType='next'
                        onInputChange={inputChangeHandler}
                        initialValue={editedProduct ? editedProduct.imageUrl : ''}
                        initiallyValid={!!editedProduct}
                        required
                    />
                    {editedProduct ? null : (
                        <Input
                            id='price'
                            label='Price'
                            errorText='Please enter a valid Price'
                            keyboardType='decimal-pad'
                            returnKeyType='next'
                            onInputChange={inputChangeHandler}
                            required
                            min={0}
                        />
                    )}
                    <Input
                        id='description'
                        label='Description'
                        errorText='Please enter a valid Description'
                        keyboardType='default'
                        autoCapitalize='words'
                        autoCorrect
                        multiline
                        numberOfLines={3}
                        onInputChange={inputChangeHandler}
                        initialValue={editedProduct ? editedProduct.description : ''}
                        initiallyValid={!!editedProduct}
                        required
                        min={5}
                    />
                    <ImgPicker/>
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    )
}

export const editProductOptions = navData => {

    const submitFn = navData.route.params ? navData.route.params.submit : null;

    const routeParams = navData.route.params ? navData.route.params : {};
    return {
        headerTitle: routeParams.productId ? 'Edit product' : 'Add Product',

        headerRight: () => (<HeaderButtons HeaderButtonComponent={HeaderButton}>
            <Item title='Save' iconName='ios-checkmark'
                onPress={submitFn}
            />
        </HeaderButtons>
        ),
    }
}

const styles = StyleSheet.create({
    form: {
        margin: 20
    },
    centered: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }

})

export default EditProductScreen;