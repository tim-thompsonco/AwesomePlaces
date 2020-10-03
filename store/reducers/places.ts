import { ADD_PLACE, SET_PLACES } from '../actions/places';

import Place from '../../models/place';

interface placesState {
  places: Place[];
}

const initialState: placesState = {
  places: [],
};

export default (state = initialState, action: any) => {
  switch (action.type) {
    case ADD_PLACE:
      const newPlace = new Place(
        action.placeData.id,
        action.placeData.title,
        action.placeData.image
      );

      return {
        places: state.places.concat(newPlace),
      };
    case SET_PLACES:
      return {
        places: action.places.map(
          (place: Place) =>
            new Place(place.id.toString(), place.title, place.imageUri)
        ),
      };
    default:
      return state;
  }
};
