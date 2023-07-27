import React, { useEffect } from "react";
import { Skeleton } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { getAllProject, getProjectCategory } from "../../slices/projectSlice";
import Pagination from "../../components/Pagination/Pagination";

export default function ProjectList() {
  const { isLoading, projectList } = useSelector(
    (state) => state.projectReducer
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllProject());
    dispatch(getProjectCategory());
  }, []);

  return (
    <>
      <Pagination itemsPerPage={5} items={projectList} />
      {isLoading && <Skeleton active />}
    </>
  );
}
