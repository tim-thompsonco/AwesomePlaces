import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import MapView, { Marker } from 'react-native-maps';

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
  const [selectedLocation, setSelectedLocation] = useState<
    Location | undefined
  >();

  const mapRegion: MapRegion = {
    latitude: 37.78,
    longitude: -122.43,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  };

  const selectLocationHandler = (event: any) => {
    const selectedLat: number = event.nativeEvent.coordinate.latitude;
    const selectedLng: number = event.nativeEvent.coordinate.longitude;

    setSelectedLocation({
      lat: selectedLat,
      lng: selectedLng,
    });
  };

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

const styles = StyleSheet.create({
  map: {
    flex: 1,
  },
});

export default MapScreen;
