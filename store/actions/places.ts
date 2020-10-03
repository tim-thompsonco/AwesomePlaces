import * as FileSystem from 'expo-file-system';

export const ADD_PLACE = 'ADD_PLACE';

export const addPlace = (title: string, imageUrl: string) => {
  return async (dispatch: any) => {
    const fileName: string | undefined = imageUrl.split('/').pop();
    const folderPath: string | null = FileSystem.documentDirectory;

    let newPath;

    if (fileName && folderPath) {
      newPath = folderPath + fileName;

      try {
        await FileSystem.moveAsync({
          from: imageUrl,
          to: newPath,
        });
      } catch (err) {
        console.log(err);
        throw err;
      }
    }

    dispatch({ type: ADD_PLACE, placeData: { title: title, image: newPath } });
  };
};
