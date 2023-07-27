import React, { useEffect } from "react";
import Comment from "./Comment";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { getAllComment } from "../../slices/commentSlice";
import { Skeleton } from "antd";
import { useForm } from "react-hook-form";
import AlertError from "../Alert/AlertError";
import { apiInsertComment } from "../../apis/commentAPI";
import AlertSuccess from "../Alert/AlertSuccess";

export default function CommentList({ taskId }) {
  const { listComment, isLoading } = useSelector(
    (state) => state.commentReducer
  );
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllComment(taskId));
  }, [taskId]);
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm({ defaultValues: { comment: "" } });
  const onSubmit = async ({ comment }) => {
    try {
      const payload = {
        taskId,
        contentComment: comment,
      };
      const data = await apiInsertComment(payload);
      if (data) {
        AlertSuccess("Comment successfully !!!");
        reset({
          comment: "",
        });
        dispatch(getAllComment(taskId));
      }
    } catch (error) {
      AlertError(error?.response?.data?.content);
    }
  };
  const onError = (errors) => {
    console.log(errors);
  };
  return (
    <section className="bg-white  py-8 ">
      <div className="max-w-2xl mx-auto pe-4">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-lg font-bold text-gray-900">Comment</h2>
        </div>
        <form onSubmit={handleSubmit(onSubmit, onError)} className="mb-6">
          <div className="py-2 px-4 mb-4 bg-white rounded-lg rounded-t-lg border border-gray-200  ">
            <label htmlFor="comment" className="sr-only">
              Your comment
            </label>
            <textarea
              {...register("comment")}
              rows={6}
              className="px-0 w-full text-sm text-gray-900 border-0 focus:ring-0 focus:outline-none  "
              placeholder="Write a comment..."
            />
          </div>
          <button
            type="submit"
            className="inline-flex  items-center py-2.5 px-4 text-xs font-medium text-center text-white bg-blue-700 rounded-lg focus:ring-4  hover:bg-primary-800"
          >
            Post comment
          </button>
        </form>
        {isLoading && <Skeleton active />}
        {listComment?.map((cmt, index) => {
          return <Comment comment={cmt} key={index} />;
        })}
      </div>
    </section>
  );
}
