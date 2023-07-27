import React from "react";

export default function HeaderDetail({ projectDetail }) {
  return (
    <div className="header">
      <nav>
        <ol className=" flex items-center py-4 gap-2 bg-white">
          <li className="breadcrumb-item">Project /</li>
          <li className="breadcrumb-item">CyberLearn /</li>
          <li className="breadcrumb-item active">
            {projectDetail?.projectName}
          </li>
        </ol>
      </nav>
    </div>
  );
}
