import React from "react";
import ProjectList from "../../modules/Home/ProjectList";

export default function HomePage() {
  return (
    <div className="w-full">
      <h1 className="text-5xl font-semibold my-10 ps-4 ">Project Management</h1>
      <ProjectList />
    </div>
  );
}
