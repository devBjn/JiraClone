import {
  faBars,
  faCircleQuestion,
  faMagnifyingGlass,
  faPlus,
  faRightFromBracket,
  faUserTie,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import { signOut } from "../../slices/userSlice";
import SearchModal from "../Modal/SearchModal";
import { useDispatch } from "react-redux";
import { openModalSearch, showModalTask } from "../../slices/modalSlice";
import ModalTask from "../Modal/ModalTask";
import { NavLink, useNavigate } from "react-router-dom";

export default function SideBar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const styleShowSideBar = {
    width: "15%",
    position: "fixed",
    height: "100vh",
    zIndex: "10",
    backgroundColor: "#202c3b",
    transition: "350ms",
  };

  const styleHideSideBar = {
    position: "fixed",
    height: "100vh",
    zIndex: "10",
    backgroundColor: "#202c3b",
    width: " 4%",
    transition: "350ms",
  };
  const [showSideBar, setShowSideBar] = useState(false);
  return (
    <>
      <div style={showSideBar ? styleShowSideBar : styleHideSideBar}>
        <div className="sideBar-top">
          <div
            className={` ${
              showSideBar ? "text-end " : "text-center"
            } pt-[10%] pr-[10%] text-white`}
          >
            <FontAwesomeIcon
              className={`${
                showSideBar ? "py-0" : "py-5 "
              } text-2xl pr-[5%] cursor-pointer`}
              icon={faBars}
              onClick={() => {
                setShowSideBar(!showSideBar);
              }}
            />
          </div>
          <div
            className=" text-white p-[20%]  cursor-pointer"
            onClick={() => dispatch(openModalSearch())}
          >
            <FontAwesomeIcon
              className="text-2xl pr-[5%]"
              icon={faMagnifyingGlass}
            />
            <span
              className={`${
                showSideBar ? `inline-block opacity-100 ` : `hidden opacity-0`
              } transition-all text-white  font-semibold`}
            >
              Search
            </span>
          </div>
          <div
            className="cursor-pointer text-white px-[20%] py-[5%]"
            onClick={() => dispatch(showModalTask())}
          >
            <FontAwesomeIcon className="text-2xl pr-[5%]" icon={faPlus} />
            <span
              className={`${
                showSideBar ? `inline-block opacity-100 ` : `hidden opacity-0`
              } transition-all text-white  font-semibold`}
            >
              Create Task
            </span>
          </div>
        </div>
        <div className="sideBar-bottom">
          <div className=" text-white py-[15%] px-[5%] flex items-center gap-3">
            <FontAwesomeIcon className="text-2xl" icon={faCircleQuestion} />
            <span
              className={`${
                showSideBar ? `inline-block opacity-100 ` : `hidden opacity-0`
              } transition-all text-white  font-semibold`}
            >
              About
            </span>
          </div>
          <div className="cursor-pointer w-44 py-[15%] px-[5%] text-white font-semibold ">
            <NavLink className="flex items-center gap-3" to="/login">
              <FontAwesomeIcon className="text-2xl" icon={faUserTie} />
              <span
                className={`${
                  showSideBar ? `inline-block opacity-100 ` : `hidden opacity-0`
                } transition-all text-white  font-semibold`}
              >
                Sign In
              </span>
            </NavLink>
          </div>
          <div
            onClick={() => {
              dispatch(signOut());
              navigate("/login");
            }}
            className="cursor-pointer w-44 py-[15%] px-[5%] text-white font-semibold flex items-center gap-3"
          >
            <FontAwesomeIcon className="text-2xl" icon={faRightFromBracket} />
            <span
              className={`${
                showSideBar ? `inline-block opacity-100 ` : `hidden opacity-0`
              } transition-all text-white  font-semibold`}
            >
              Sign Out
            </span>
          </div>
        </div>
      </div>
      <SearchModal />
      <ModalTask />
    </>
  );
}
