import { ADD_PLACE } from '../actions/places';

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
        new Date().toString(),
        action.placeData.title,
        action.placeData.image
      );

      return {
        places: state.places.concat(newPlace),
      };
    default:
      return state;
  }
};
