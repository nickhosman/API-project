import React from "react";

import { useModal } from "../../context/Modal";
import * as reviewActions from "../../store/reviews";
import { useDispatch } from "react-redux";

export default function ReviewDeleteModal({ review }) {
  const dispatch = useDispatch();
  const { closeModal } = useModal();

  const confirmDelete = (reviewId) => {
    dispatch(reviewActions.deleteReview(reviewId)).catch(async (res) => {
      const data = await res.json();
      console.log("removeReview errors:", data);
    });

    closeModal();
  };

  return (
    <>
      <h1>Confirm Delete</h1>
      <p>Are you sure you want to remove this review?</p>
      <div className="delete-button-wrapper">
        <button
          className="confirm-delete"
          onClick={() => {
            confirmDelete(review.id);
          }}
        >
          Yes (Delete Review)
        </button>
        <button className="cancel-delete" onClick={closeModal}>
          No (Keep Spot)
        </button>
      </div>
    </>
  );
}
