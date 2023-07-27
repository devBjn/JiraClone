import React, { useEffect } from "react";
import HeaderDetail from "../../modules/Detail/HeaderDetail";
import InfoDetail from "../../modules/Detail/InfoDetail";
import ContentDetail from "../../modules/Detail/ContentDetail";
import { useParams } from "react-router-dom";
import prase from "html-react-parser";
import { useDispatch } from "react-redux";
import { getProjectDetail } from "../../slices/projectSlice";
import { useSelector } from "react-redux";

export default function DetailPage() {
  const { projectId } = useParams();
  const { projectDetail } = useSelector((state) => state.projectReducer);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getProjectDetail(projectId));
  }, [projectId]);
  return (
    <div className="main">
      <HeaderDetail projectDetail={projectDetail} />
      <h3 className="text-3xl mt-2 font-semibold">
        {projectDetail?.projectName}
      </h3>
      <h4 className="mb-3 text-lg">{prase(`${projectDetail?.description}`)}</h4>
      <InfoDetail members={projectDetail?.members} />
      <ContentDetail taskList={projectDetail?.lstTask} />
    </div>
  );
}
