import React from "react";

import { useModal } from "../../context/Modal";
import * as reviewActions from "../../store/reviews";
import * as spotActions from "../../store/spots";
import { useDispatch } from "react-redux";
import "./ReviewDeleteModal.css";

export default function ReviewDeleteModal({ review }) {
  const dispatch = useDispatch();
  const { closeModal } = useModal();

  const confirmDelete = (review) => {
    dispatch(reviewActions.deleteReview(review.id)).catch(async (res) => {
      const data = await res.json();
      console.log("removeReview errors:", data);
    });

    dispatch(spotActions.getSpotDetails(review.spotId));

    closeModal();
  };

  return (
    <div className="review-delete-wrapper">
      <h1>Confirm Delete</h1>
      <p>Are you sure you want to remove this review?</p>
      <div className="delete-button-wrapper">
        <button
          className="confirm-delete"
          onClick={() => {
            confirmDelete(review);
          }}
        >
          Yes (Delete Review)
        </button>
        <button className="cancel-delete" onClick={closeModal}>
          No (Keep Review)
        </button>
      </div>
    </div>
  );
}
