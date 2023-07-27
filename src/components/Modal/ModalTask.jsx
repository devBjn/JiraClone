import { Drawer } from "antd";
import React, { useEffect, useRef } from "react";
import { closeModalTask } from "../../slices/modalSlice";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import FormCreateTask from "../Forms/FormCreateTask";
import {
  getAllPriority,
  getAllStatus,
  getAllTaskType,
} from "../../slices/taskSlice";

export default function ModalTask() {
  const dispatch = useDispatch();
  const formRef = useRef();
  const { showModalTask } = useSelector((state) => state.modalReducer);

  useEffect(() => {
    dispatch(getAllTaskType());
    dispatch(getAllPriority());
    dispatch(getAllStatus());
  }, []);
  return (
    <Drawer
      title="Create a task project"
      width={720}
      onClose={() => dispatch(closeModalTask())}
      open={showModalTask}
      bodyStyle={{
        paddingBottom: 80,
      }}
      footer={
        <div className="flex items-center justify-end gap-2">
          <button
            onClick={() => dispatch(closeModalTask())}
            className="text-black hover:text-white transition-all border border-blue-700 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center "
          >
            Cancel
          </button>
          <button
            onClick={() => formRef.current.submitForm()}
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center "
          >
            Create
          </button>
        </div>
      }
    >
      <FormCreateTask reference={formRef} />
    </Drawer>
  );
}
