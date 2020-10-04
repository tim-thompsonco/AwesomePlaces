import React, { useState } from 'react';
import { View, Button, Image, Text, StyleSheet, Alert } from 'react-native';
import * as ImgPicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';

import Colors from '../constants/Colors';

interface ImageObject {
  cancelled: boolean;
  height?: number;
  type?: string;
  uri?: string;
  width?: number;
}

interface Props {
  onImageTaken(uri: string): any;
}

const ImagePicker = (props: Props) => {
  const [pickedImage, setPickedImage] = useState<string>('');

  const verifyPermissions = async () => {
    const result = await Permissions.askAsync(
      Permissions.CAMERA,
      Permissions.CAMERA_ROLL
    );

    if (result.status !== 'granted') {
      Alert.alert(
        'Insufficient permissions!',
        'You need to grant camera permissions to use this app.',
        [{ text: 'Ok' }]
      );

      return false;
    }

    return true;
  };

  const takeImageHandler = async () => {
    const hasPermission: boolean = await verifyPermissions();

    if (!hasPermission) {
      return;
    }

    const image: ImageObject = await ImgPicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [16, 9],
      quality: 0.5,
    });

    if (!image.cancelled && image.uri) {
      setPickedImage(image.uri);
      props.onImageTaken(image.uri);
    }
  };

  return (
    <View style={styles.imagePicker}>
      <View style={styles.imagePreview}>
        {!pickedImage ? (
          <Text>No image picked yet.</Text>
        ) : (
          <Image style={styles.image} source={{ uri: pickedImage }} />
        )}
      </View>
      <Button
        title='Take Image'
        color={Colors.primary}
        onPress={takeImageHandler}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  image: {
    height: '100%',
    width: '100%',
  },
  imagePicker: {
    alignItems: 'center',
    marginBottom: 15,
  },
  imagePreview: {
    height: 200,
    width: '100%',
    marginBottom: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#ccc',
    borderWidth: 1,
  },
});

export default ImagePicker;
