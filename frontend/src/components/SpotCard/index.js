import React from "react";
import "./SpotCard.css";
import { NavLink } from "react-router-dom";
import OpenModalButton from "../OpenModalButton";
import ModalSpotDelete from "../ManageSpots/ModalSpotDelete";
import { useSpotContext } from "../../context/Spot";
import { useHistory } from "react-router-dom";

export default function SpotCard({ spotInfo, manage }) {
  const history = useHistory();
  const { setSpot } = useSpotContext();
  // console.log("spotInfo:", spotInfo);

  const handleUpdateClick = () => {
    setSpot(spotInfo);
    history.push(`/spots/${spotInfo.id}/edit`);
  };

  return (
    <>
      <div className="spot-card" title={spotInfo.name}>
        <NavLink to={`/spots/${spotInfo.id}`}>
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
            <h4>
              {spotInfo.city}, {spotInfo.state}
            </h4>
            <span className="location-rating">
              <i className="fa-solid fa-star fa-xs"></i>
              {isNaN(spotInfo.avgRating) || spotInfo.avgRating === null
                ? "New"
                : parseFloat(spotInfo.avgRating).toFixed(2)}
            </span>
          </div>
          <span className="price">
            <h4>${spotInfo.price}</h4> night
          </span>
        </NavLink>
        {manage === true ? (
          <span>
            <button onClick={handleUpdateClick}>Update</button>
            <OpenModalButton
              modalComponent={<ModalSpotDelete spotId={spotInfo.id} />}
              buttonText="Delete"
            />
          </span>
        ) : null}
      </div>
    </>
  );
}
