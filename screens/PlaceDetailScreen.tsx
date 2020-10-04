import React from 'react';
import { ScrollView, Image, View, Text, StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';

import Place from '../models/place';
import MapPreview from '../components/MapPreview';
import Colors from '../constants/Colors';

const PlacesDetailScreen = (props: any) => {
  const placeId: string = props.navigation.getParam('placeId');
  const selectedPlace: Place = useSelector((state: any) =>
    state.places.places.find((place: Place) => place.id === placeId)
  );

  return (
    <ScrollView contentContainerStyle={styles.viewContainer}>
      <Image style={styles.image} source={{ uri: selectedPlace.imageUri }} />
      <View style={styles.locationContainer}>
        <View style={styles.addressContainer}>
          <Text style={styles.address}>{selectedPlace.address}</Text>
        </View>
        <MapPreview
          style={styles.mapPreview}
          location={{ lat: selectedPlace.lat, lng: selectedPlace.lng }}
        />
      </View>
    </ScrollView>
  );
};

PlacesDetailScreen.navigationOptions = (navData: any) => {
  return {
    headerTitle: navData.navigation.getParam('placeTitle'),
  };
};

const styles = StyleSheet.create({
  viewContainer: {
    alignItems: 'center',
  },
  image: {
    height: '35%',
    minHeight: 300,
    width: '100%',
    backgroundColor: '#ccc',
  },
  locationContainer: {
    marginVertical: 20,
    width: '90%',
    maxWidth: 350,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: 'black',
    shadowOpacity: 0.26,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 5,
    backgroundColor: 'white',
    borderRadius: 10,
  },
  addressContainer: {
    padding: 20,
  },
  address: {
    color: Colors.primary,
    textAlign: 'center',
  },
  mapPreview: {
    width: '100%',
    maxWidth: 350,
    height: 300,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
  },
});

export default PlacesDetailScreen;
