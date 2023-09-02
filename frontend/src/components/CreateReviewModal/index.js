import React, { useState } from "react";

import { useModal } from "../../context/Modal";
import * as reviewActions from "../../store/reviews";
import { useDispatch } from "react-redux";
import "./CreateReviewModal.css";

export default function CreateReviewModal({ spotId, user }) {
  const dispatch = useDispatch();
  const [rating, setRating] = useState(0);
  const [activeRating, setActiveRating] = useState(rating);
  const [review, setReview] = useState("");
  const { closeModal } = useModal();

  let arr = [1, 2, 3, 4, 5];

  const onChange = (num) => {
    setRating(parseInt(num));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const reviewBody = {
      review,
      stars: rating,
    };

    dispatch(
      reviewActions.createReview(JSON.stringify(reviewBody), spotId, user)
    );

    closeModal();
  };

  return (
    <form className="create-review-wrapper" onSubmit={handleSubmit}>
      <h1>How was your stay?</h1>
      <textarea
        className="review-input"
        placeholder="Leave your review here..."
        value={review}
        onChange={(e) => setReview(e.target.value)}
      ></textarea>
      <div className="rating-input">
        {
          <div className="star-container">
            {arr.map((data) => {
              return (
                <div className="star" key={data}>
                  <i
                    className={
                      activeRating >= data
                        ? "fa-solid fa-star fa-xl"
                        : "fa-regular fa-star fa-xl"
                    }
                    onMouseEnter={() => setActiveRating(data)}
                    onMouseLeave={() => setActiveRating(rating)}
                    onClick={() => onChange(data)}
                  ></i>
                </div>
              );
            })}
          </div>
        }
      </div>
      <button>Submit Your Review</button>
    </form>
  );
}
