import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";

import * as spotActions from "../../store/spots";
import SpotCard from "../SpotCard";
import "../SpotIndex/SpotIndex.css";

export default function ManageSpots() {
  const dispatch = useDispatch();
  const spots = useSelector((state) => state.spots.allSpots.Spots);

  useEffect(() => {
    dispatch(spotActions.clearSpots());
    dispatch(spotActions.getOwnedSpots());
  }, [dispatch]);

  if (!spots) return null;

  return (
    <div className="manage-spots-wrapper">
      <h1>Manage Spots</h1>
      <div className="spot-card-wrapper">
        {spots.length > 0 ? (
          <div className="spot-card-container">
            {spots.map((spot) => {
              return <SpotCard key={spot.id} spotInfo={spot} manage={true} />;
            })}
          </div>
        ) : (
          <NavLink to="/spots/new">
            <button>Create a New Spot</button>
          </NavLink>
        )}
      </div>
    </div>
  );
}
