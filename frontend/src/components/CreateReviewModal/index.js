import React from "react";

import { useModal } from "../../context/Modal";
import * as reviewActions from "../../store/reviews";
import { useDispatch } from "react-redux";

export default function CreateReviewModal() {
  const dispatch = useDispatch();
  const { closeModal } = useModal();

  const handleSubmit = (e) => {
    e.preventDefault();
  }

  return (
    <>
      <h1>How was your stay?</h1>
      <textarea placeholder="Leave your review here..."></textarea>
      <div className="rating-input">
        {}
      </div>
    </>
  )
}
