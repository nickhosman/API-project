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
  let index = 0;
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

  const compareById = (a, b) => {
    return b.id - a.id;
  };

  const orderReviews = (reviews) => {
    let reviewArr = Object.values(reviews);
    // console.log("reviewArr:", reviewArr);

    return reviewArr.sort(compareById);
  };

  const avgRating = Number.parseFloat(spot.avgStarRating).toFixed(2);

  return (
    <div className="spot-detail-wrapper">
      <div className="spot-detail">
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
                  index++;
                  return (
                    <img
                      alt=""
                      key={image.id}
                      src={image.url}
                      className={`spot-image-${index}`}
                    />
                  );
                })
              : null}
            {spot.SpotImages.length < 2 ? <div className="spot-image-2"></div> : null}
            {spot.SpotImages.length < 3 ? <div className="spot-image-3"></div> : null}
            {spot.SpotImages.length < 4 ? <div className="spot-image-4"></div> : null}
            {spot.SpotImages.length < 5 ? <div className="spot-image-5"></div> : null}
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
      </div>
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
        {spot.ownerId !== user.id &&
        !reviewAuthors.includes(user.id) &&
        user ? (
          <OpenModalButton
            modalComponent={<CreateReviewModal spotId={spotId} user={user} />}
            buttonText="Post Your Review"
          />
        ) : null}
        {Object.values(reviews).length > 0
          ? orderReviews(reviews).map((review) => {
              return (
                <ReviewTile review={review} userId={user.id} key={review.id} />
              );
            })
          : user.id === spot.ownerId
          ? "No reviews yet."
          : "Be the first to post a review!"}
      </section>
    </div>
  );
}
