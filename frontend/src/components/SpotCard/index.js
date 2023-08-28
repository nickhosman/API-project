import React from "react";
import "./SpotCard.css";

export default function SpotCard({ spotInfo }) {
  // console.log("spotInfo:", spotInfo);

  return (
    <div className="spot-card" title={spotInfo.name}>
      <img
        className="spot-image"
        src={
          spotInfo.previewImage !== "No preview image found"
            ? spotInfo.previewImage
            : "https://thenounproject.com/api/private/icons/1583620/edit/?backgroundShape=SQUARE&backgroundShapeColor=%23000000&backgroundShapeOpacity=0&exportSize=752&flipX=false&flipY=false&foregroundColor=%23000000&foregroundOpacity=1&imageFormat=png&rotation=0"
        }
      />
      <div className="info-wrapper">
        <h3>
          {spotInfo.city}, {spotInfo.state}
        </h3>
        <span className="location-rating">
          <i className="fa-solid fa-star fa-xs"></i>
          {spotInfo.avgRating}
        </span>
      </div>
      <span className="price">
        <h4>${spotInfo.price}</h4> night
      </span>
    </div>
  );
}
