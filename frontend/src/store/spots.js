import { csrfFetch } from "./csrf";

const LOAD_SPOTS = "spots/loadSpots";

const loadSpots = (spots) => {
  return {
    type: LOAD_SPOTS,
    payload: spots,
  };
};

export const getSpots = () => async (dispatch) => {
  const response = await csrfFetch("/api/spots");

  if (response.ok) {
    const spots = await response.json();
    dispatch(loadSpots(spots));
  }

  return response;
};

const initialState = { allSpots: { Spots: []}};

const spotReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOAD_SPOTS:
      return {
        ...state,
        allSpots: action.payload,
      };
    default:
      return state;
  }
};

export default spotReducer;
