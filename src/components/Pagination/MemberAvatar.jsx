import { faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Avatar, Popover } from "antd";
import React from "react";
import AlertConfirm from "../Alert/AlertConfirm";
import { apiRemoveUserFromProject } from "../../apis/projectAPI";
import AlertSuccess from "../Alert/AlertSuccess";
import { useDispatch } from "react-redux";
import { getAllProject } from "../../slices/projectSlice";
import AlertError from "../Alert/AlertError";
import AddMember from "./AddMember";

export default function MemberAvatar({ projectItem }) {
  const dispatch = useDispatch();
  const handleRemoveUser = (payload) => {
    try {
      AlertConfirm().then(async (result) => {
        if (result.isConfirmed) {
          const data = await apiRemoveUserFromProject(payload);
          if (data) {
            AlertSuccess("Remove a user from this project successfully !!!");
            dispatch(getAllProject());
          }
          return data;
        }
      });
    } catch (error) {
      AlertError(error?.response?.data?.message);
    }
  };
  return (
    <div className=" flex items-center flex-wrap gap-2 relative">
      <div className="flex gap-1 items-center">
        <Popover
          placement="top"
          overlayInnerStyle={{
            width: "350px",
          }}
          trigger="click"
          color="white"
          title={
            <table className="w-full text-center ps-4 table-auto font-medium text-black">
              <thead className="border-b border-black p-4">
                <tr className="text-sm ">
                  <th className="pe-2 pb-1 pt-3">Id</th>
                  <th className="pe-2 pb-1 pt-3">Avatar</th>
                  <th className="pe-2 pb-1 pt-3">Name</th>
                  <th className="pe-2 pb-1 pt-3">Actions</th>
                </tr>
              </thead>
              <tbody>
                {projectItem.members?.map((user, index) => {
                  const isLast = index === projectItem.members.length - 1;
                  const classes = isLast
                    ? "p-2"
                    : "p-2 border-b border-blue-gray-50";
                  return (
                    <tr key={index}>
                      <td className={classes}>{user.userId}</td>
                      <td className={classes}>
                        <img
                          key={index}
                          className="rounded-[50%] w-8 group"
                          src={user?.avatar}
                          alt={user?.avatar}
                        />
                      </td>
                      <td className={classes}>{user.name}</td>
                      <td className={classes}>
                        <div>
                          <button
                            className="bg-red-400 px-3 rounded-md py-2"
                            onClick={() => {
                              const payload = {
                                projectId: projectItem.id,
                                userId: user.userId,
                              };
                              handleRemoveUser(payload);
                            }}
                          >
                            <FontAwesomeIcon
                              size="sm"
                              color="white"
                              icon={faTrashCan}
                            />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          }
        >
          {projectItem.members?.slice(0, 2).map((user, index) => {
            return (
              <Avatar
                className="cursor-pointer"
                key={index}
                src={user?.avatar}
              />
            );
          })}
          {projectItem.members.length > 0 &&
            (projectItem.members.length - 2 > 0 ? (
              <Avatar className="cursor-pointer">
                +{projectItem.members.length - 2}
              </Avatar>
            ) : (
              <></>
            ))}
        </Popover>
      </div>
      <AddMember projectItem={projectItem} />
    </div>
  );
}
