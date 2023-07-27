import React from "react";
import { useSelector } from "react-redux";
import { Empty } from "antd";
import SideBar from "../components/SideBar/SideBar";
import Menu from "../components/Menu/Menu";

export default function UserLayout({ children }) {
  const { user } = useSelector((state) => state.userReducer);
  return (
    <div className="jira flex">
      <SideBar />

      <Menu />

      <div
        className={`${
          !user
            ? "flex  w-[79%] items-center justify-center flex-col"
            : " w-[79%]"
        }`}
      >
        {user ? children : <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />}
      </div>
    </div>
  );
}
