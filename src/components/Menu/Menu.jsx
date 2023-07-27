import {
  faArrowTrendUp,
  faBox,
  faCreditCard,
  faEquals,
  faFileLines,
  faGear,
  faTruck,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";

export default function Menu() {
  const { user } = useSelector((state) => state.userReducer);
  return (
    <div className="menu">
      <div className="account">
        <div className="avatar">
          <img src={user?.avatar} alt="" />
        </div>
        <div className="account-info">
          <p>{user?.name}</p>
          <p>Report bugs</p>
        </div>
      </div>
      <div className="control">
        <div className="flex items-center justify-start gap-2">
          <div className="w-7">
            <FontAwesomeIcon icon={faCreditCard} />
          </div>
          <NavLink
            className={({ isActive }) => (isActive ? "font-semibold" : "")}
            to="/detailProject"
          >
            <span>Cyber Board</span>
          </NavLink>
        </div>
        <div className="flex items-center justify-start gap-2">
          <div className="w-7">
            <FontAwesomeIcon icon={faCreditCard} />
          </div>
          <NavLink
            className={({ isActive }) => (isActive ? "font-semibold" : "")}
            to="/"
          >
            <span>Project Management</span>
          </NavLink>
        </div>
        <div className="flex items-center justify-start gap-2">
          <div className="w-7">
            <FontAwesomeIcon icon={faGear} />
          </div>
          <NavLink
            className={({ isActive }) => (isActive ? "font-semibold" : "")}
            to="/createProject"
          >
            <span>Create Project</span>
          </NavLink>
        </div>
      </div>
      <div className="feature">
        <div className="flex items-center justify-start gap-2">
          <div className="w-7">
            <FontAwesomeIcon icon={faTruck} />
          </div>
          <span>Releases</span>
        </div>
        <div className="flex items-center justify-start gap-2">
          <div className="w-7">
            <FontAwesomeIcon icon={faEquals} />
          </div>
          <span>Issues and filters</span>
        </div>
        <div className="flex items-center justify-start gap-2">
          <div className="w-7">
            <FontAwesomeIcon icon={faFileLines} />
          </div>
          <span>Pages</span>
        </div>
        <div className="flex items-center justify-start gap-2">
          <div className="w-7">
            <FontAwesomeIcon icon={faArrowTrendUp} />
          </div>
          <span>Reports</span>
        </div>
        <div className="flex items-center justify-start gap-2">
          <div className="w-7">
            <FontAwesomeIcon icon={faBox} />
          </div>
          <span>Components</span>
        </div>
      </div>
    </div>
  );
}
