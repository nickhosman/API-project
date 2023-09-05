import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import * as sessionActions from "../../store/session";
import "./SignupForm.css";

function SignupFormModal() {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const { closeModal } = useModal();

  useEffect(() => {
    let valErrors = {};

    if (password !== confirmPassword && hasSubmitted)
      valErrors["confirmPassword"] =
        "Confirm Password field must be the same as the Password field";

    setErrors(valErrors);
  }, [password, confirmPassword, hasSubmitted]);

  const handleSubmit = (e) => {
    e.preventDefault();

    setHasSubmitted(true);

    if (password === confirmPassword) {
      return dispatch(
        sessionActions.signup({
          email,
          username,
          firstName,
          lastName,
          password,
        })
      )
        .then(closeModal)
        .catch(async (res) => {
          const data = await res.json();
          if (data && data.errors) {
            // console.log("error data:", data);
            setErrors(data.errors);
          }
        });
    }
  };

  return (
    <div className="signup-wrapper">
      <h1>Sign Up</h1>
      <form onSubmit={handleSubmit} className="signup-form">
        <label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            placeholder="Email"
            className="signup-modal-input"
          />
        </label>
        {errors.email && <p className="error">{errors.email}</p>}
        <label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            placeholder="Username"
            className="signup-modal-input"
          />
        </label>
        {errors.username && <p className="error">{errors.username}</p>}
        <label>
          <input
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
            placeholder="First Name"
            className="signup-modal-input"
          />
        </label>
        {errors.firstName && <p className="error">{errors.firstName}</p>}
        <label>
          <input
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            required
            placeholder="Last Name"
            className="signup-modal-input"
          />
        </label>
        {errors.lastName && <p className="error">{errors.lastName}</p>}
        <label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            placeholder="Password"
            className="signup-modal-input"
          />
        </label>
        {errors.password && <p className="error">{errors.password}</p>}
        <label>
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            placeholder="Confirm Password"
            className="signup-modal-input"
          />
        </label>
        {errors.confirmPassword && (
          <p className="error">{errors.confirmPassword}</p>
        )}
        <button
          type="submit"
          disabled={
            email.length === 0 ||
            username.length < 4 ||
            firstName.length === 0 ||
            lastName.length === 0 ||
            password.length < 6 ||
            confirmPassword.length === 0
          }
          className={
            email.length === 0 ||
            username.length < 4 ||
            firstName.length === 0 ||
            lastName.length === 0 ||
            password.length < 6 ||
            confirmPassword.length === 0
              ? "disabled-signup-modal-button"
              : "signup-modal-button"
          }
        >
          Sign Up
        </button>
      </form>
    </div>
  );
}

export default SignupFormModal;
