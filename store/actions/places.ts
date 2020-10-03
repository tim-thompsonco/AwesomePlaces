import * as FileSystem from 'expo-file-system';

import { insertPlace, fetchPlaces } from '../../data/db';

export const ADD_PLACE = 'ADD_PLACE';
export const SET_PLACES = 'SET_PLACES';

export const addPlace = (title: string, imageUrl: string) => {
  return async (dispatch: any) => {
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
          'Dummy address',
          15.6,
          12.3
        );

        dispatch({
          type: ADD_PLACE,
          placeData: { id: dbResult.insertId, title: title, image: newPath },
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
