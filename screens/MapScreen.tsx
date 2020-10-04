import React, { useState, useEffect, useCallback } from 'react';
import {
  Alert,
  Text,
  StyleSheet,
  TouchableOpacity,
  Platform,
} from 'react-native';
import MapView, { Marker } from 'react-native-maps';

import Colors from '../constants/Colors';

interface MapRegion {
  latitude: number;
  longitude: number;
  latitudeDelta: number;
  longitudeDelta: number;
}

interface Location {
  lat: number;
  lng: number;
}

const MapScreen = (props: any) => {
  const initialLocation: Location | undefined = props.navigation.getParam(
    'initialLocation'
  );
  const readonly: boolean | undefined = props.navigation.getParam('readonly');

  const [selectedLocation, setSelectedLocation] = useState<
    Location | undefined
  >(initialLocation);

  const mapRegion: MapRegion = {
    latitude: initialLocation ? initialLocation.lat : 37.78,
    longitude: initialLocation ? initialLocation.lng : -122.43,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  };

  const selectLocationHandler = (event: any) => {
    if (readonly) {
      return;
    }

    const selectedLat: number = event.nativeEvent.coordinate.latitude;
    const selectedLng: number = event.nativeEvent.coordinate.longitude;

    setSelectedLocation({
      lat: selectedLat,
      lng: selectedLng,
    });
  };

  const savePickedLocationHandler = useCallback(() => {
    if (!selectedLocation) {
      return Alert.alert(
        'No location picked!',
        'You need to pick a location first before saving.',
        [{ text: 'Okay' }]
      );
    }

    props.navigation.navigate('NewPlace', { pickedLocation: selectedLocation });
  }, [selectedLocation]);

  useEffect(() => {
    props.navigation.setParams({ saveLocation: savePickedLocationHandler });
  }, [savePickedLocationHandler]);

  let markerCoordinates;

  if (selectedLocation) {
    markerCoordinates = {
      latitude: selectedLocation.lat,
      longitude: selectedLocation.lng,
    };
  }

  return (
    <MapView
      style={styles.map}
      region={mapRegion}
      onPress={selectLocationHandler}
    >
      {markerCoordinates && (
        <Marker title='Picked Location' coordinate={markerCoordinates}></Marker>
      )}
    </MapView>
  );
};

MapScreen.navigationOptions = (navData: any) => {
  const saveFn = navData.navigation.getParam('saveLocation');
  const readonly: boolean | undefined = navData.navigation.getParam('readonly');

  if (readonly) {
    return {};
  }

  return {
    headerRight: () => {
      return (
        <TouchableOpacity style={styles.headerButton} onPress={saveFn}>
          <Text style={styles.headerButtonText}>Save</Text>
        </TouchableOpacity>
      );
    },
  };
};

const styles = StyleSheet.create({
  headerButton: {
    marginHorizontal: 20,
  },
  headerButtonText: {
    fontSize: 16,
    color: Platform.OS === 'android' ? 'white' : Colors.primary,
  },
  map: {
    flex: 1,
  },
});

export default MapScreen;
