import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { AutoComplete, Popover } from "antd";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { getAllProject } from "../../slices/projectSlice";
import { useSelector } from "react-redux";
import { assignUser, getUserList } from "../../slices/userSlice";

export default function AddMember({ projectItem }) {
  const timeOutRef = useRef();
  const dispatch = useDispatch();
  const [searchTerm, setSearchTerm] = useState("");
  const [value, setValue] = useState("");
  const { userList } = useSelector((state) => state.userReducer);

  useEffect(() => {
    dispatch(getUserList(searchTerm));
  }, [searchTerm]);
  return (
    <div className="w-8 h-8 leading-8 rounded-[50%] text-center border border-gray-700">
      <Popover
        placement="right"
        title="Add members"
        content={() => {
          return (
            <AutoComplete
              className="w-full"
              onSearch={(value) => {
                clearTimeout(timeOutRef.current);
                timeOutRef.current = setTimeout(() => {
                  setSearchTerm(value);
                }, 300);
              }}
              options={userList?.map((user) => {
                return {
                  label: user.name,
                  value: user.userId.toString(),
                };
              })}
              onSelect={async (valueSelected, option) => {
                setValue(option.label);
                dispatch(
                  assignUser({
                    projectId: projectItem.id,
                    userId: valueSelected,
                  })
                );
                dispatch(getAllProject());
                setValue("");
              }}
              onChange={(value) => {
                setValue(value);
              }}
              value={value}
            />
          );
        }}
        trigger="click"
      >
        <FontAwesomeIcon className="cursor-pointer" icon={faPlus} />
      </Popover>
    </div>
  );
}
