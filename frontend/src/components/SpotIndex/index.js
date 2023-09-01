import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as spotActions from "../../store/spots";
import SpotCard from "../SpotCard";
import "./SpotIndex.css";

export default function SpotIndex() {
  const dispatch = useDispatch();
  const spots = useSelector((state) => state.spots.allSpots.Spots);
  // console.log("Spots:", spots);

  useEffect(() => {
    dispatch(spotActions.getSpots());
    dispatch(spotActions.resetSpot());
  }, [dispatch]);

  if (!spots) return null;

  return (
    <div className="spot-card-wrapper">
      <div className="spot-card-container">
        {spots.map((spot) => {
          // console.log("spot:", spot);
          return <SpotCard key={spot.id} spotInfo={spot} />;
        })}
      </div>
    </div>
  );
}
