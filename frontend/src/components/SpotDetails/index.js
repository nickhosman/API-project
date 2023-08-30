import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import * as spotActions from "../../store/spots";
import * as reviewActions from "../../store/reviews";
import { useDispatch, useSelector } from "react-redux";
import OpenModalButton from "../OpenModalButton";
import ReviewTile from "./ReviewTile";
import "./SpotDetails.css";
import CreateReviewModal from "../CreateReviewModal";

export default function SpotDetails() {
  const { spotId } = useParams();
  const dispatch = useDispatch();
  const spot = useSelector((state) => state.spots.singleSpot);
  const reviews = useSelector((state) => state.reviews.spot);
  const user = useSelector((state) => state.session.user);
  let userId;
  if (user) {
    userId = user.id;
  }
  // console.log(spot);

  useEffect(() => {
    dispatch(spotActions.getSpotDetails(spotId));
    dispatch(reviewActions.getSpotReviews(spotId));
  }, [dispatch, spotId]);

  if (!reviews) return null;
  if (!spot.id) return null;

  let reviewAuthors = Object.values(reviews).map((review) => {
    return review.userId;
  });

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
        {parseInt(spot.numReviews) > 1
          ? " ‧ " + spot.numReviews + " reviews "
          : parseInt(spot.numReviews) === 1
          ? " ‧ 1 review "
          : ""}
        {" ‧ "}
        {spot.city}, {spot.state}, {spot.country}
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
      <section className="review-wrapper">
        <div
          className={
            Object.values(reviews).length > 0 ? "review-header" : "hidden"
          }
        >
          <i className="fa-solid fa-star"></i>
          <h3>
            {isNaN(avgRating) ? "New" : avgRating}{" "}
            {parseInt(spot.numReviews) > 1
              ? " ‧ " + spot.numReviews + " reviews "
              : parseInt(spot.numReviews) === 1
              ? " ‧ 1 review "
              : ""}
          </h3>
        </div>
        {spot.ownerId !== userId && !reviewAuthors.includes(userId) && user ? (
          <OpenModalButton
            modalComponent={<CreateReviewModal spotId={spotId} />}
            buttonText="Post Your Review"
          />
        ) : null}
        {Object.values(reviews).length > 0
          ? Object.values(reviews).map((review) => {
              return <ReviewTile review={review} userId={userId} />;
            })
          : userId === spot.ownerId
          ? "No reviews yet."
          : "Be the first to post a review!"}
      </section>
    </>
  );
}
