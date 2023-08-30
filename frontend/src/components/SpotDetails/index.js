import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import * as spotActions from "../../store/spots";
import { useDispatch, useSelector } from "react-redux";

export default function SpotDetails() {
  const { spotId } = useParams();
  const dispatch = useDispatch();
  const spot = useSelector((state) => state.spots.singleSpot);
  // console.log(spot);

  useEffect(() => {
    dispatch(spotActions.getSpotDetails(spotId));
  }, [dispatch, spotId]);

  if (!spot.id) return null;

  const handleClick = () => {
    alert("Feature coming soon");
  };

  const avgRating = Number.parseFloat(spot.avgStarRating).toFixed(2);

  return (
    <>
      <h1>{spot.name}</h1>
      <section>
        <i className="fa-solid fa-star fa-xs"></i>
        {isNaN(avgRating) ? "New" : avgRating}{" "}
        {parseInt(spot.numReviews) > 1 ? " ‧ " + spot.numReviews + " reviews " : parseInt(spot.numReviews) === 1 ? " ‧ 1 review " : ""}
        {" ‧ "}{spot.state}, {spot.country}
        <div className="img-wrapper">
          {spot.SpotImages
            ? spot.SpotImages.map((image) => {
                return <img alt="" key={image.id} src={image.url} />;
              })
            : null}
        </div>
        <div className="spot-info">
          <h2>
            Hosted by {spot.Owner.firstName} {spot.Owner.lastName}
          </h2>
          <p>{spot.description}</p>
        </div>
        <div className="callout-info">
          <span className="spot-price">${spot.price} night</span>
          <button className="reserve-button" onClick={handleClick}>
            Reserve
          </button>
        </div>
      </section>
    </>
  );
}
