import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";

import * as spotActions from "../../store/spots";
import SpotCard from "../SpotCard";
import "../SpotIndex/SpotIndex.css";
import { useHistory } from "react-router-dom";

export default function ManageSpots() {
  const dispatch = useDispatch();
  const history = useHistory();
  const user = useSelector((state) => state.session.user);
  const spots = useSelector((state) => state.spots.allSpots.Spots);

  useEffect(() => {
    if (user) {
      dispatch(spotActions.clearSpots());
      dispatch(spotActions.getOwnedSpots());
    }
  }, [dispatch, user]);

  if (!user) return history.push("/");

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
