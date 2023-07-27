import React, { useRef } from "react";
import { Drawer } from "antd";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { closeModalProject } from "../../slices/modalSlice";
import FormEditProject from "../Forms/FormEditProject";

export default function ModalProject() {
  const dispatch = useDispatch();
  const { showModalProject } = useSelector((state) => state.modalReducer);
  const formRef = useRef();
  return (
    <Drawer
      title="Edit a project"
      width={720}
      onClose={() => dispatch(closeModalProject())}
      open={showModalProject}
      bodyStyle={{
        paddingBottom: 80,
      }}
      footer={
        <div className="flex items-center justify-end gap-2">
          <button
            onClick={() => dispatch(closeModalProject())}
            className="text-black hover:text-white transition-all border border-blue-700 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center "
          >
            Cancel
          </button>
          <button
            onClick={() => formRef.current.submitForm()}
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center "
          >
            Update
          </button>
        </div>
      }
    >
      {<FormEditProject reference={formRef} />}
    </Drawer>
  );
}
