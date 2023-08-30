import React, { useState } from "react";

export default function StarRatingInput() {
  const [activeRating, setActiveRating] = useState(0);

  const createStars = (num) => {
    let rating = 0;
    for (let i = 1; i <= num; i++) {
      <div className={activeRating >= i ? "filled" : "empty"}>
        <i
          className="fa-solid fa-star"
          onMouseEnter={() => setActiveRating(i)}
          onMouseLeave={() => setActiveRating(rating)}
          onClick={() => onChange(i)}
        ></i>
      </div>;
    }
  };

  return;
}
