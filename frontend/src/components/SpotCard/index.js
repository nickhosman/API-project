import React from "react";
import "./SpotCard.css";
import { useHistory } from "react-router-dom";

export default function SpotCard({ spotInfo }) {
  // console.log("spotInfo:", spotInfo);
  const history = useHistory();

  const handleClick = () => {
    history.push(`/spots/${spotInfo.id}`);
  };

  return (
    <div className="spot-card" title={spotInfo.name} onClick={handleClick}>
      <img
        className="spot-image"
        alt="preview"
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
          {!isNaN(spotInfo.avgRating) ? spotInfo.avgRating : "New"}
        </span>
      </div>
      <span className="price">
        <h4>${spotInfo.price}</h4> night
      </span>
    </div>
  );
}
