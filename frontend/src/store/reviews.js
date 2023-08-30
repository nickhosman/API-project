import { csrfFetch } from "./csrf";

const LOAD = "reviews/loadReviews";
const DELETE = "reviews/removeReview";
const ADD = "reviews/addReview";

const loadReviews = (reviews) => {
  return {
    type: LOAD,
    payload: reviews,
  };
};

const removeReview = (reviewId) => {
  return {
    type: DELETE,
    payload: reviewId,
  };
};

const addReview = (review) => {
  return {
    type: ADD,
    payload: review,
  };
};

export const getSpotReviews = (spotId) => async (dispatch) => {
  const response = await csrfFetch(`/api/spots/${spotId}/reviews`);

  if (response.ok) {
    const reviews = await response.json();

    // console.log("reviews:", reviews)
    let reviewObj = {};
    reviews.Reviews.forEach((review) => {
      let id = review.id;
      reviewObj[id] = review;
    });
    dispatch(loadReviews(reviewObj));
  }
};

export const deleteReview = (reviewId) => async (dispatch) => {
  const response = await csrfFetch(`/api/reviews/${reviewId}`, {
    method: "DELETE",
  });

  if (response.ok) {
    dispatch(removeReview(reviewId));

    const message = await response.json();

    return message;
  }
};

const initialState = {};

const reviewReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOAD:
      return {
        ...state,
        spot: action.payload,
      };
    case DELETE:
      const reviewList = {};
      Object.assign(reviewList, state.spot);
      delete reviewList[action.payload];

      return {
        ...state,
        spot: { ...reviewList },
      };
    case ADD:
      const spotObj = { ...state.spot };
      spotObj[action.payload.id] = action.payload;

      return {
        ...state,
        spot: { ...spotObj },
      };
    default:
      return state;
  }
};

export default reviewReducer;
