import React, {useState} from 'react';
import { View, StyleSheet, Text, Button, Image, Alert } from 'react-native';
import Colors from '../../constants/Colors';
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions'

const ImgPicker = props => {

    const [pickedImage, setPickedImage] = useState()

    const verifyPermissions = async () => {
        const resutl = await Permissions.askAsync(Permissions.CAMERA, Permissions.CAMERA_ROLL)
        if (resutl.status !== 'granted') {
            Alert.alert(
                'No Cam Permission',
                'You need to grant camera permission first',
                [{ text: 'Okay' }])
            return false;
        }
        return true;
    }
    const takeImageHandler = async () => {
        const hasPermission = await verifyPermissions();
        if(!hasPermission){
            return;
        }
        const image = await ImagePicker.launchCameraAsync({
            allowsEditing: true,
            aspect: [16, 9 ],
            quality: 0.5
        })
        setPickedImage(image.uri)
    };
    return (
        <View style={styles.imagePicker}>
            <View style={styles.imagePreview} >
                {!pickedImage ? ( <Text>No Image Pick up yet.</Text>) :
                <Image style={styles.image} source={{ uri: pickedImage}} />}
            </View>
            <Button title='take a pic' color={Colors.primary} onPress={takeImageHandler} />
        </View>
    )
}

const styles = StyleSheet.create({
    imagePicker: {

    },
    imagePreview: {
        width: '100%',
        height: 200,
        alignItems: 'center',
        justifyContent: 'center'
    },
    image: {
        width: '100%',
        height: '100%'
    }
})

export default ImgPicker;