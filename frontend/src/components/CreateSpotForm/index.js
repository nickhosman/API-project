import React, { useEffect, useState } from "react";

import * as spotActions from "../../store/spots";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { csrfFetch } from "../../store/csrf";
import { useSpotContext } from "../../context/Spot";
import "./CreateSpotForm.css";

export default function CreateSpotForm({ edit }) {
  const dispatch = useDispatch();
  const history = useHistory();
  const { spot } = useSpotContext();
  const [country, setCountry] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [description, setDescription] = useState("");
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [previewImageURL, setPreviewImageURL] = useState("");
  const [otherImage1, setOtherImage1] = useState("");
  const [otherImage2, setOtherImage2] = useState("");
  const [otherImage3, setOtherImage3] = useState("");
  const [otherImage4, setOtherImage4] = useState("");
  const [errors, setErrors] = useState({});
  const [hasSubmitted, setHasSubmitted] = useState(false);

  const checkFiletype = (url) => {
    if (url) {
      if (
        !url.split(".").includes("jpeg") &&
        !url.split(".").includes("jpg") &&
        !url.split(".").includes("png")
      ) {
        return true;
      } else return false;
    } else return false;
  };

  useEffect(() => {
    const valErrors = {};

    if (description.length < 30)
      valErrors["description"] = "Description needs 30 or more characters";

    if (checkFiletype(previewImageURL))
      valErrors["previewImageUrl"] =
        "Image URL must end in .png, .jpg, or .jpeg";

    if (checkFiletype(otherImage1))
      valErrors["otherImage1"] = "Image URL must end in .png, .jpg, or .jpeg";

    if (checkFiletype(otherImage2))
      valErrors["otherImage2"] = "Image URL must end in .png, .jpg, or .jpeg";

    if (checkFiletype(otherImage3))
      valErrors["otherImage3"] = "Image URL must end in .png, .jpg, or .jpeg";

    if (checkFiletype(otherImage4))
      valErrors["otherImage4"] = "Image URL must end in .png, .jpg, or .jpeg";

    setErrors(valErrors);
  }, [description, previewImageURL, otherImage1, otherImage2, otherImage3, otherImage4]);

  useEffect(() => {
    if (edit && Object.keys(spot).length > 0) {
      setCountry(spot.country);
      setAddress(spot.address);
      setCity(spot.city);
      setState(spot.state);
      setDescription(spot.description);
      setName(spot.name);
      setPrice(spot.price);
    }
  }, [
    setCountry,
    setAddress,
    setCity,
    setState,
    setDescription,
    setName,
    setPrice,
    spot,
    edit,
  ]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setHasSubmitted(true);

    if (Object.keys(errors).length > 0) return null;

    const newSpot = {
      address,
      city,
      state,
      country,
      name,
      description,
      price,
    };

    // console.log("spot:", spot);
    if (!edit) {
      const data = await dispatch(
        spotActions.createSpot(JSON.stringify(newSpot))
      ).catch(async (res) => {
        const data = await res.json();
        if (data && data.errors) {
          // console.log("data:", data);
          setErrors(data.errors);
          return null;
        }
      });

      if (data.id) {
        const previewBody = JSON.stringify({
          url: previewImageURL,
          preview: true,
        });
        csrfFetch(`/api/spots/${data.id}/images`, {
          method: "POST",
          body: previewBody,
        });

        const imgArray = [otherImage1, otherImage2, otherImage3, otherImage4];
        let promiseArr = [];

        let imgBody;
        for (let img of imgArray) {
          // console.log("img url:", img);
          if (img.length > 0) {
            imgBody = JSON.stringify({
              url: img,
              preview: false,
            });
            promiseArr.push(
              csrfFetch(`/api/spots/${data.id}/images`, {
                method: "POST",
                body: imgBody,
              })
            );
          }
        }

        Promise.all(promiseArr);

        history.push(`/spots/${data.id}`);
      }
    } else {
      csrfFetch(`/api/spots/${spot.id}`, {
        method: "PUT",
        body: JSON.stringify(newSpot),
      });

      history.push(`/spots/${spot.id}`);
    }
  };

  return (
    <div className="create-spot-wrapper">
      <h1>{edit ? "Update your Spot" : "Create a New Spot"}</h1>
      <form onSubmit={handleSubmit}>
        <section className="location-wrapper">
          <div className="form-details">
            <h2>Where's your place located?</h2>
            <p>
              Guests will only get your exact address once they've booked a
              reservation.
            </p>
          </div>
          <label>
            <p>Country</p>
            <input
              type="text"
              placeholder="Country"
              required
              value={country}
              onChange={(e) => setCountry(e.target.value)}
            />
          </label>
          <label>
            <p>Street address</p>
            <input
              type="text"
              placeholder="Street Address"
              required
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
          </label>
          <div className="city-state-wrapper">
            <label className="city-input">
              <p>City</p>
              <input
                type="text"
                placeholder="City"
                required
                value={city}
                onChange={(e) => setCity(e.target.value)}
              />
            </label>
            <label className="state-input">
              <p>State</p>
              <input
                type="text"
                placeholder="State"
                required
                value={state}
                onChange={(e) => setState(e.target.value)}
              />
            </label>
          </div>
        </section>
        <section className="description-wrapper">
          <h2>Describe your place to guests</h2>
          <p>
            Mention the best features of your space, any special amenities like
            fast wifi or parking, and what you love about the neighborhood
          </p>
          <textarea
            autoComplete="off"
            placeholder="Please write at least 30 characters"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          ></textarea>
          {errors.description && hasSubmitted ? (
            <p className="errors">{errors.description}</p>
          ) : null}
        </section>
        <section className="title-wrapper">
          <h2>Create a title for your spot</h2>
          <label>
            <input
              type="text"
              placeholder="Name your spot"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </label>
        </section>
        <section className="form-price-wrapper">
          <h2>Set a base price for your spot</h2>
          <p>
            Competitive pricing can help your listing stand out and rank higher
            in search results
          </p>
          <label>
            <i className="fa-solid fa-dollar-sign fa-lg"></i>
            <input
              type="number"
              placeholder="Price per night (USD)"
              required
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
          </label>
        </section>
        {edit ? null : (
          <section className="form-img-wrapper">
            <h2>Liven up your spot with photos</h2>
            <p>Submit a link to at least one photo to publish your spot.</p>
            <label>
              <input
                type="url"
                placeholder="Preview Image URL"
                required
                value={previewImageURL}
                onChange={(e) => setPreviewImageURL(e.target.value)}
              />
              {errors.previewImageUrl && hasSubmitted ? (
                <p className="errors">{errors.previewImageUrl}</p>
              ) : null}
              <input
                type="url"
                placeholder="Image URL"
                value={otherImage1}
                onChange={(e) => setOtherImage1(e.target.value)}
              />
              {errors.otherImage1 && hasSubmitted ? (
                <p className="errors">{errors.otherImage1}</p>
              ) : null}
              <input
                type="url"
                placeholder="Image URL"
                value={otherImage2}
                onChange={(e) => setOtherImage2(e.target.value)}
              />
              {errors.otherImage2 && hasSubmitted ? (
                <p className="errors">{errors.otherImage2}</p>
              ) : null}
              <input
                type="url"
                placeholder="Image URL"
                value={otherImage3}
                onChange={(e) => setOtherImage3(e.target.value)}
              />
              {errors.otherImage3 && hasSubmitted ? (
                <p className="errors">{errors.otherImage3}</p>
              ) : null}
              <input
                type="url"
                placeholder="Image URL"
                value={otherImage4}
                onChange={(e) => setOtherImage4(e.target.value)}
              />
              {errors.otherImage4 && hasSubmitted ? (
                <p className="errors">{errors.otherImage4}</p>
              ) : null}
            </label>
          </section>
        )}
        <button>{edit ? "Update your Spot" : "Create Spot"}</button>
      </form>
    </div>
  );
}
