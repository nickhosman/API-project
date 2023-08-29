import { csrfFetch } from "./csrf";

const LOAD_SPOTS = "spots/loadSpots";
const GET_SPOT = "spots/getSpot";
const RESET_SPOT = "spots/resetSpot";
const ADD_SPOT = "spots/addSpot";
const DELETE_SPOT = "spots/deleteSpot";

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

const deleteSpot = (spotId) => {
  return {
    type: DELETE_SPOT,
    payload: spotId,
  };
};

export const resetSpot = () => {
  return {
    type: RESET_SPOT,
  };
};

const addSpot = (spot) => {
  return {
    type: ADD_SPOT,
    payload: spot,
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

export const getOwnedSpots = () => async (dispatch) => {
  const response = await csrfFetch("/api/spots/current");

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

export const createSpot = (spot) => async (dispatch) => {
  const response = await csrfFetch("/api/spots", {
    method: "POST",
    body: spot,
  });

  if (response.ok) {
    const spot = await response.json();

    dispatch(addSpot(spot));

    return spot;
  }
};

export const removeSpot = (spotId) => async (dispatch) => {
  const response = await csrfFetch(`/api/spots/${spotId}`, {
    method: "DELETE",
  });

  if (response.ok) {
    dispatch(deleteSpot(spotId));

    const message = await response.json();

    return message;
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
    case ADD_SPOT:
      return {
        ...state,
        allSpots: {
          ...state.allSpots,
          Spots: [...state.allSpots.Spots, action.payload],
        },
      };
    case DELETE_SPOT:
      const spot = state.allSpots.Spots.find(
        (spot) => spot.id === action.payload
      );

      let newSpots = [...state.allSpots.Spots];
      const index = newSpots.indexOf(spot);

      newSpots.splice(index, 1);

      return {
        ...state,
        allSpots: { ...state.allSpots, Spots: newSpots },
      };
    default:
      return state;
  }
};

export default spotReducer;
