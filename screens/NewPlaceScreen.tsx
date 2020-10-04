import React, { useState, useCallback } from 'react';
import {
  ScrollView,
  Button,
  View,
  Text,
  TextInput,
  StyleSheet,
} from 'react-native';
import { useDispatch } from 'react-redux';

import Colors from '../constants/Colors';
import * as placesActions from '../store/actions/places';
import ImagePicker from '../components/ImagePicker';
import LocationPicker from '../components/LocationPicker';

interface Coords {
  lat: number;
  lng: number;
}

const NewPlaceScreen = (props: any) => {
  const dispatch = useDispatch();

  const [title, setTitle] = useState<string>('');
  const [image, setImage] = useState<string>('');
  const [location, setLocation] = useState<Coords | undefined>();

  const titleChangeHandler = (text: string) => {
    setTitle(text);
  };

  const imageTakenHandler = (imagePath: string) => {
    setImage(imagePath);
  };

  const locationPickedHandler = useCallback((location: Coords) => {
    setLocation(location);
  }, []);

  const savePlaceHandler = () => {
    if (location) {
      dispatch(placesActions.addPlace(title, image, location));
      props.navigation.goBack();
    }
  };

  return (
    <ScrollView>
      <View style={styles.form}>
        <Text style={styles.label}>Title</Text>
        <TextInput
          style={styles.textInput}
          onChangeText={titleChangeHandler}
          value={title}
        />
        <ImagePicker onImageTaken={imageTakenHandler} />
        <LocationPicker
          navigation={props.navigation}
          onLocationPicked={locationPickedHandler}
        />
        <Button
          title='Save Place'
          color={Colors.primary}
          onPress={savePlaceHandler}
        />
      </View>
    </ScrollView>
  );
};

NewPlaceScreen.navigationOptions = {
  headerTitle: 'Add Place',
};

const styles = StyleSheet.create({
  form: {
    margin: 30,
  },
  label: {
    fontSize: 18,
    marginBottom: 15,
  },
  textInput: {
    borderBottomColor: '#ccc',
    borderBottomWidth: 1,
    marginBottom: 15,
    paddingVertical: 4,
    paddingHorizontal: 2,
  },
});

export default NewPlaceScreen;
