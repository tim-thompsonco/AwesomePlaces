import * as FileSystem from 'expo-file-system';

import { insertPlace, fetchPlaces } from '../../data/db';
import ENV from '../../env';

export const ADD_PLACE = 'ADD_PLACE';
export const SET_PLACES = 'SET_PLACES';

interface Coords {
  lat: number;
  lng: number;
}

export const addPlace = (title: string, imageUrl: string, location: Coords) => {
  return async (dispatch: any) => {
    const response = await fetch(
      `https://maps.googleapis.com/maps/api/geocode/json?latlng=${location.lat},${location.lng}&key=${ENV.googleApiKey}`
    );

    if (!response.ok) {
      throw new Error('Error during decoding of GPS coordinates!');
    }

    const resData = await response.json();

    if (!resData.results[0].formatted_address) {
      throw new Error('Error during decoding of GPS coordinates!');
    }

    const address: string = resData.results[0].formatted_address;
    const fileName: string | undefined = imageUrl.split('/').pop();
    const folderPath: string | null = FileSystem.documentDirectory;

    if (fileName && folderPath) {
      const newPath = folderPath + fileName;

      try {
        await FileSystem.moveAsync({
          from: imageUrl,
          to: newPath,
        });

        const dbResult: any = await insertPlace(
          title,
          newPath,
          address,
          location.lat,
          location.lng
        );

        dispatch({
          type: ADD_PLACE,
          placeData: {
            id: dbResult.insertId,
            title: title,
            image: newPath,
            address: address,
            coords: { lat: location.lat, lng: location.lng },
          },
        });
      } catch (err) {
        console.log(err);
        throw err;
      }
    }
  };
};

export const loadPlaces = () => {
  return async (dispatch: any) => {
    try {
      const dbResult: any = await fetchPlaces();

      dispatch({ type: SET_PLACES, places: dbResult.rows._array });
    } catch (err) {
      throw err;
    }
  };
};
