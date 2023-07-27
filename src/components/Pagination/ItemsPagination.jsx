import React from "react";
import { Tag } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare, faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { Typography } from "@material-tailwind/react";
import { apiDeleteProject } from "../../apis/projectAPI";
import { useDispatch } from "react-redux";
import { getAllProject } from "../../slices/projectSlice";
import AlertConfirm from "../Alert/AlertConfirm";
import AlertSuccess from "../Alert/AlertSuccess";
import AlertError from "../Alert/AlertError";
import ModalProject from "../Modal/ModalProject";
import { openModalProject } from "../../slices/modalSlice";
import MemberAvatar from "./MemberAvatar";
import { NavLink } from "react-router-dom";

export default function ItemsPagination({ currentItems }) {
  const dispatch = useDispatch();
  const handleDeleteProject = (projectId) => {
    try {
      AlertConfirm().then(async (result) => {
        if (result.isConfirmed) {
          const data = await apiDeleteProject(projectId);
          if (data) {
            AlertSuccess("Remove a project successfully !!!");
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
    <>
      {currentItems &&
        currentItems.map((projectItem, index) => {
          const isLast = index === currentItems.length - 1;
          const classes = isLast
            ? "px-4  py-6"
            : "py-6 px-4  border-b border-blue-gray-50";
          return (
            <tr key={index}>
              <td className={classes}>
                <Typography
                  variant="paragraph"
                  color="blue-gray"
                  className="font-normal"
                >
                  {projectItem.id}
                </Typography>
              </td>
              <td className={classes}>
                <Typography
                  variant="paragraph"
                  color="blue-gray"
                  className="font-normal cursor-pointer"
                >
                  <NavLink to={`projectDetail/${projectItem.id}`}>
                    {" "}
                    {projectItem.projectName}
                  </NavLink>
                </Typography>
              </td>
              <td className={classes}>
                <Typography
                  variant="paragraph"
                  color="blue-gray"
                  className="font-normal"
                >
                  {projectItem.categoryName}
                </Typography>
              </td>
              <td className={classes}>
                <Typography
                  variant="paragraph"
                  color="blue-gray"
                  className="font-normal"
                >
                  <Tag color="green">{projectItem.creator.name}</Tag>
                </Typography>
              </td>
              <td className={`${classes}`}>
                <>
                  <MemberAvatar projectItem={projectItem} />
                </>
              </td>
              <td className={`${classes} `}>
                <div className="flex gap-1 items-center">
                  <button
                    className=" bg-blue-200 px-3 rounded-md  py-2"
                    onClick={() => {
                      dispatch(openModalProject(projectItem));
                    }}
                  >
                    <FontAwesomeIcon
                      size="sm"
                      color="white"
                      icon={faPenToSquare}
                    />
                  </button>
                  <button
                    className="bg-red-400 px-3 rounded-md py-2"
                    onClick={() => {
                      handleDeleteProject(projectItem.id);
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
      <ModalProject />
    </>
  );
}
