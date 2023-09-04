import React from "react";

import { useModal } from "../../context/Modal";
import * as spotActions from "../../store/spots";
import { useDispatch } from "react-redux";
import "./ModalSpotDelete.css";

export default function ModalSpotDelete({ spotId }) {
  const dispatch = useDispatch();
  const { closeModal } = useModal();

  const confirmDelete = (spotId) => {
    // console.log("spotId:", spotId);

    dispatch(spotActions.removeSpot(spotId)).catch(async (res) => {
      const data = await res.json();
      console.log("removeSpot error:", data);
    });

    closeModal();
  };

  return (
    <div className="delete-spot-modal">
      <h1>Confirm Delete</h1>
      <p>Are you sure you want to remove this spot?</p>
      <div className="delete-button-wrapper">
        <button
          className="confirm-delete"
          onClick={() => {
            confirmDelete(spotId);
          }}
        >
          Yes (Delete Spot)
        </button>
        <button className="cancel-delete" onClick={closeModal}>
          No (Keep Spot)
        </button>
      </div>
    </div>
  );
}
