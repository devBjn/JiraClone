import React, { useState } from "react";
import parse from "html-react-parser";
import { Button, Tooltip } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare, faTrashCan } from "@fortawesome/free-solid-svg-icons";
import AlertConfirm from "../Alert/AlertConfirm";
import { apiRemoveComment, apiUpdateComment } from "../../apis/commentAPI";
import AlertSuccess from "../Alert/AlertSuccess";
import AlertError from "../Alert/AlertError";
import { useDispatch } from "react-redux";
import { getAllComment } from "../../slices/commentSlice";
import { useForm } from "react-hook-form";

export default function Comment({ comment }) {
  const dispatch = useDispatch();
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({ defaultValues: { comment: parse(comment.contentComment) } });
  const [isRead, setIsRead] = useState(true);
  const handleRemoveComment = (idComment) => {
    try {
      AlertConfirm().then(async (result) => {
        if (result.isConfirmed) {
          const data = await apiRemoveComment(idComment);
          if (data) {
            AlertSuccess("Remove a comment successfully !!!");
            dispatch(getAllComment(comment.taskId));
          }
          return data;
        }
      });
    } catch (error) {
      AlertError(error?.response?.data?.message);
    }
  };
  const onSubmit = async (values) => {
    try {
      console.log(comment.id, values.comment);
      const data = await apiUpdateComment(comment.id, values.comment);
      if (data) {
        AlertSuccess("Update successfully !!!");
        dispatch(getAllComment(comment.taskId));
        setIsRead(true);
      }
    } catch (error) {
      AlertError(error?.response?.data?.content);
    }
  };
  const onError = (errors) => {
    console.log(errors);
  };
  return (
    <article className="p-6 text-base bg-white border-t border-gray-200 ">
      <div className="flex justify-between items-center mb-2">
        <div className="flex items-center">
          <p className="inline-flex items-center mr-3 text-md text-gray-900">
            <img
              className="mr-2 w-8 h-8 rounded-full"
              src={comment.user.avatar}
              alt="Helene Engels"
            />
            <span className="font-semibold">{comment.user.name}</span>
          </p>
        </div>
        <Tooltip
          placement="bottom"
          title={
            <div className="flex gap-5 items-center">
              <FontAwesomeIcon
                className="cursor-pointer"
                size="lg"
                icon={faTrashCan}
                onClick={() => handleRemoveComment(comment.id)}
              />
              <FontAwesomeIcon
                className="cursor-pointer"
                size="lg"
                icon={faPenToSquare}
                onClick={() => setIsRead(false)}
              />
            </div>
          }
        >
          <button
            id="dropdownComment4Button"
            className="inline-flex items-center p-2 text-sm font-medium text-center text-gray-400 bg-white rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-50"
            type="button"
          >
            <svg
              className="w-5 h-5"
              aria-hidden="true"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M6 10a2 2 0 11-4 0 2 2 0 014 0zM12 10a2 2 0 11-4 0 2 2 0 014 0zM16 12a2 2 0 100-4 2 2 0 000 4z"></path>
            </svg>
          </button>
        </Tooltip>
      </div>

      <div className="py-2 px-4 mb-4 bg-white rounded-lg rounded-t-lg border border-gray-200  ">
        <label htmlFor="comment" className="sr-only">
          Your comment
        </label>
        <form onSubmit={handleSubmit(onSubmit, onError)}>
          <textarea
            rows={6}
            className="px-0 w-full text-sm text-gray-900 border-0 focus:ring-0 focus:outline-none  "
            placeholder="Write a comment..."
            {...register("comment")}
            readOnly={isRead}
            autoFocus={isRead}
          />
          {!isRead && (
            <div className="flex gap-1 justify-end">
              <Button onClick={() => setIsRead(true)}>Cancel</Button>
              <Button
                htmlType="submit"
                style={{ background: "#1877ff", color: "white" }}
              >
                Save
              </Button>
            </div>
          )}
        </form>
      </div>
    </article>
  );
}
