import React from 'react';
import { View, Button, Image, Text, StyleSheet, Alert } from 'react-native';
import * as ImgPicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';

import Colors from '../constants/Colors';

const ImagePicker = (props: any) => {
  const verifyPermissions = async () => {
    const result = await Permissions.askAsync(Permissions.CAMERA);

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
    const hasPermission = await verifyPermissions();

    if (!hasPermission) {
      return;
    }

    ImgPicker.launchCameraAsync();
  };

  return (
    <View style={styles.imagePicker}>
      <View style={styles.imagePreview}>
        <Text>No image picked yet.</Text>
        <Image style={styles.image} />
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
