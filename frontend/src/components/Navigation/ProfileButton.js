import React, { useState, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import { useHistory } from "react-router-dom";

import * as sessionActions from "../../store/session";
import OpenModalMenuItem from "./OpenModalMenuItem";
import LoginFormModal from "../LoginFormModal";
import SignupFormModal from "../SignupFormModal";

function ProfileButton({ user }) {
  const dispatch = useDispatch();
  const history = useHistory();
  const [showMenu, setShowMenu] = useState(false);
  const ulRef = useRef();

  const openMenu = () => {
    if (showMenu) return;
    setShowMenu(true);
  };

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = (e) => {
      if (!ulRef.current.contains(e.target)) {
        setShowMenu(false);
      }
    };

    document.addEventListener("click", closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  const closeMenu = () => setShowMenu(false);

  const logout = (e) => {
    e.preventDefault();
    dispatch(sessionActions.logout());
    closeMenu();
    history.push("/");
  };

  const ulClassName = "profile-dropdown" + (showMenu ? "" : " hidden");
  const btnClassName = "profile-button" + (showMenu ? " clicked-menu" : "");

  return (
    <>
      {user ? (
        <NavLink className="create-spot-btn" to="/spots/new">
          Create a Spot
        </NavLink>
      ) : null}
      <button onClick={openMenu} className={btnClassName}>
        <i className="fa-solid fa-bars fa-xl"></i>
        <i className="fa-solid fa-circle-user fa-xl"></i>
      </button>
      <ul className={ulClassName} ref={ulRef}>
        {user ? (
          <>
            <div className="dropdown-user-info">
              <li>
                Hello, {user.firstName}!
              </li>
              <li>{user.email}</li>
            </div>
            <li className="menu-link-container">
              <NavLink
                to="/spots/manage"
                onClick={closeMenu}
                className="manage-link"
              >
                Manage Spots
              </NavLink>
            </li>
            <button onClick={logout} className="logout-button">
              Log Out
            </button>
          </>
        ) : (
          <>
              <OpenModalMenuItem
                itemText="Log In"
                onItemClick={closeMenu}
                modalComponent={<LoginFormModal />}
              />
              <OpenModalMenuItem
                itemText="Sign Up"
                onItemClick={closeMenu}
                modalComponent={<SignupFormModal />}
              />
          </>
        )}
      </ul>
    </>
  );
}

export default ProfileButton;
