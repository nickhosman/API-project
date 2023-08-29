import { csrfFetch } from "./csrf";

const LOAD_SPOTS = "spots/loadSpots";
const GET_SPOT = "spots/getSpot";
const RESET_SPOT = "spots/resetSpot";

const loadSpots = (spots) => {
  return {
    type: LOAD_SPOTS,
    payload: spots,
  };
};

const getSpot = (spot) => {
  return {
    type: GET_SPOT,
    payload: spot,
  };
};

export const resetSpot = () => {
  return {
    type: RESET_SPOT,
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

export const getSpotDetails = (spotId) => async (dispatch) => {
  const response = await csrfFetch(`/api/spots/${spotId}`);

  if (response.ok) {
    const spot = await response.json();
    dispatch(getSpot(spot));
  }
};

const initialState = {
  allSpots: { Spots: [] },
  singleSpot: {},
};

const spotReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOAD_SPOTS:
      return {
        ...state,
        allSpots: action.payload,
      };
    case GET_SPOT:
      return {
        ...state,
        singleSpot: action.payload,
      };
    case RESET_SPOT:
      return {
        ...state,
        singleSpot: {},
      };
    default:
      return state;
  }
};

export default spotReducer;
