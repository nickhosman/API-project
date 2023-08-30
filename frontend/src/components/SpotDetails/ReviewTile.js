import React from "react";
import "./ReviewTile.css";
import OpenModalButton from "../OpenModalButton";
import ReviewDeleteModal from "../ReviewDeleteModal";

export default function ReviewTile({ review, userId }) {
  const getMonthYear = (date) => {
    const months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];

    const formattedDate = new Date(date);

    return `${months[formattedDate.getMonth()]} ${formattedDate.getFullYear()}`;
  };

  return (
    <div className="review-tile">
      <div className="review-info">
        <h4>{review.User.firstName}</h4>
        <span>{getMonthYear(review.createdAt)}</span>
      </div>
      <p>{review.review}</p>
      {userId === review.User.id ? (
        <OpenModalButton
          modalComponent={<ReviewDeleteModal review={review} />}
          buttonText="Delete"
        />
      ) : null}
    </div>
  );
}
