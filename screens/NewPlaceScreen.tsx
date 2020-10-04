import React, { useState } from 'react';
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

const NewPlaceScreen = (props: any) => {
  const dispatch = useDispatch();

  const [title, setTitle] = useState('');
  const [image, setImage] = useState('');

  const titleChangeHandler = (text: string) => {
    setTitle(text);
  };

  const imageTakenHandler = (imagePath: string) => {
    setImage(imagePath);
  };

  const savePlaceHandler = () => {
    dispatch(placesActions.addPlace(title, image));
    props.navigation.goBack();
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
        <LocationPicker navigation={props.navigation} />
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
