import React, { memo, useImperativeHandle, useRef, useState } from "react";
import Input from "../Input/Input";
import { Editor } from "@tinymce/tinymce-react";
import { useForm } from "react-hook-form";
import { Col, Row, Select, Slider } from "antd";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { getUserListByProject } from "../../slices/userSlice";
import { apiCreateTask } from "../../apis/taskAPI";
import { closeModalTask } from "../../slices/modalSlice";
import AlertSuccess from "../Alert/AlertSuccess";
import AlertError from "../Alert/AlertError";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { getProjectDetail } from "../../slices/projectSlice";

const schema = yup.object({
  taskName: yup.string().required("Task name is required !!!"),
  statusId: yup.string().required("Status is required !!!"),
  priorityId: yup.string().required("Priority is required !!!"),
  typeId: yup.string().required("Task type is required !!!"),
  timeTrackingSpent: yup
    .string()
    .required("Time tracking spent is required !!!"),
  timeTrackingRemaining: yup
    .string()
    .required("Time tracking remaining is required !!!"),
  originalEstimate: yup.string().required("Original estimate is required !!!"),
  projectId: yup.string().required("Project is required !!!"),
});

function FormCreateTask({ reference }) {
  useImperativeHandle(reference, () => ({
    submitForm() {
      handleSubmit(onSubmit)();
    },
  }));
  const { projectList } = useSelector((state) => state.projectReducer);
  const { taskType, priority, status } = useSelector(
    (state) => state.taskReducer
  );
  const { arrUser } = useSelector((state) => state.userReducer);
  const dispatch = useDispatch();
  const editorRef = useRef(null);
  const [timeTracking, setTimeTracking] = useState({
    timeTrackingSpent: 0,
    timeTrackingRemaining: 0,
  });
  const [userAssigned, setUserAssigned] = useState([]);
  const {
    control,
    register,
    getValues,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      timeTrackingRemaining: 0,
      timeTrackingSpent: 0,
      typeId: 0,
      statusId: "",
      priorityId: 0,
      taskName: "",
      originalEstimate: 0,
      projectId: 0,
    },
    mode: "onTouched",
    resolver: yupResolver(schema),
  });
  const onSubmit = async (values) => {
    try {
      const payload = {
        ...values,
        description: editorRef.current.getContent(),
        listUserAsign: userAssigned,
        projectId: Number(values.projectId),
        originalEstimate: Number(values.originalEstimate),
        typeId: Number(values.typeId),
        timeTrackingRemaining: Number(values.timeTrackingRemaining),
        timeTrackingSpent: Number(values.timeTrackingSpent),
        priorityId: Number(values.priorityId),
      };
      const data = await apiCreateTask(payload);
      if (data) {
        await AlertSuccess("Create task successfully !!!");
        reset({
          timeTrackingRemaining: 0,
          timeTrackingSpent: 0,
          typeId: 0,
          statusId: "",
          priorityId: 0,
          taskName: "",
          originalEstimate: 0,
          projectId: 0,
        });
        setUserAssigned([]);
        dispatch(closeModalTask());
        dispatch(getProjectDetail(values.projectId));
      }
    } catch (error) {
      AlertError(error?.response?.data?.content);
    }
  };
  const onError = (errors) => {
    console.log(errors);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit, onError)}>
      <div className="mb-6">
        <label
          htmlFor="projectId"
          className="block mb-2 text-sm font-semibold text-gray-900 "
        >
          Project
        </label>
        <select
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
          {...register("projectId")}
          onChange={(e) => {
            dispatch(getUserListByProject(e.target.value));
          }}
        >
          {projectList?.map((item) => {
            return (
              <option key={item.id} value={item.id}>
                {item.projectName}
              </option>
            );
          })}
        </select>
        {errors.projectId && (
          <p className="text-red-600 font-medium mt-2">
            {errors.projectId.message}
          </p>
        )}
      </div>

      <div className="mb-6">
        <label
          htmlFor="taskName"
          className="block mb-2 text-sm font-semibold text-gray-900 "
        >
          Task Name
        </label>
        <Input control={control} projectField={true} name="taskName" />
        {errors.taskName && (
          <p className="text-red-600 font-medium mt-2">
            {errors.taskName.message}
          </p>
        )}
      </div>
      <div className="mb-6">
        <label
          htmlFor="statusId"
          className="block mb-2 text-sm font-semibold text-gray-900 "
        >
          Status
        </label>
        <select
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
          {...register("statusId")}
        >
          {status?.map((item) => {
            return (
              <option key={item.statusId} value={item.statusId}>
                {item.statusName}
              </option>
            );
          })}
        </select>
        {errors.statusId && (
          <p className="text-red-600 font-medium mt-2">
            {errors.statusId.message}
          </p>
        )}
      </div>
      <Row justify={"space-between"}>
        <Col span={11}>
          <div className="mb-6">
            <label
              htmlFor="priorityId"
              className="block mb-2 text-sm font-semibold text-gray-900 "
            >
              Priority
            </label>
            <select
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              {...register("priorityId")}
            >
              {priority?.map((level) => {
                return (
                  <option key={level.priorityId} value={level.priorityId}>
                    {level.description}
                  </option>
                );
              })}
            </select>
            {errors.priorityId && (
              <p className="text-red-600 font-medium mt-2">
                {errors.priorityId.message}
              </p>
            )}
          </div>
        </Col>
        <Col span={11}>
          <div className="mb-6">
            <label
              htmlFor="typeId"
              className="block mb-2 text-sm font-semibold text-gray-900 "
            >
              Task type
            </label>
            <select
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              {...register("typeId")}
            >
              {taskType?.map((type) => {
                return (
                  <option key={type.id} value={type.id}>
                    {type.taskType}
                  </option>
                );
              })}
            </select>
            {errors.typeId && (
              <p className="text-red-600 font-medium mt-2">
                {errors.typeId.message}
              </p>
            )}
          </div>
        </Col>
      </Row>
      <Row justify={"space-between"}>
        <Col span={11}>
          <div className="mb-6">
            <label
              htmlFor="statusId"
              className="block mb-2 text-sm font-semibold text-gray-900 "
            >
              Assignees
            </label>
            <Select
              mode="multiple"
              allowClear
              style={{ width: "100%" }}
              placeholder="Please select"
              optionFilterProp="label"
              options={arrUser?.map((user) => {
                return {
                  label: user.name,
                  value: user.userId,
                };
              })}
              onSelect={async (valueSelected, option) => {
                setUserAssigned([...userAssigned, valueSelected]);
              }}
            />
          </div>
          <div className="mb-6">
            <Row>
              <Col span={24}>
                <label className="block mb-2 text-sm font-semibold text-gray-900 ">
                  Original Estimate
                </label>
                <Input
                  projectField={true}
                  control={control}
                  numberInput={true}
                  name="originalEstimate"
                />
                {errors.originalEstimate && (
                  <p className="text-red-600 font-medium mt-2">
                    {errors.originalEstimate.message}
                  </p>
                )}
              </Col>
            </Row>
          </div>
        </Col>
        <Col span={11}>
          <div className="mb-[21px]">
            <label className="block mb-2 text-sm font-semibold text-gray-900 ">
              Time Tracking
            </label>
            <Slider
              handleStyle={{
                height: "20px",
              }}
              defaultValue={30}
              value={timeTracking.timeTrackingSpent}
              max={
                Number(timeTracking.timeTrackingSpent) +
                Number(timeTracking.timeTrackingRemaining)
              }
            />
            <div className="flex justify-between items-center">
              <p className="font-medium">
                {timeTracking.timeTrackingSpent}h logged
              </p>
              <p className="font-medium">
                {timeTracking.timeTrackingRemaining}h remaining
              </p>
            </div>
          </div>
          <div className="mb-6">
            <Row justify={"space-between"}>
              <Col span={11}>
                <label
                  htmlFor="timeTrackingSpent"
                  className="block mb-2 text-sm font-semibold text-gray-900 "
                >
                  Time Spent
                </label>
                <Input
                  projectField={true}
                  control={control}
                  name="timeTrackingSpent"
                  numberInput={true}
                  onChange={(e) => {
                    setTimeTracking({
                      ...timeTracking,
                      timeTrackingSpent: getValues("timeTrackingSpent") || 0,
                    });
                  }}
                />
                {errors.timeTrackingSpent && (
                  <p className="text-red-600 font-medium mt-2">
                    {errors.timeTrackingSpent.message}
                  </p>
                )}
              </Col>
              <Col span={11}>
                <label
                  htmlFor="timeTrackingRemaining"
                  className="block mb-2 text-sm font-semibold text-gray-900 "
                >
                  Time Remaining
                </label>
                <Input
                  projectField={true}
                  control={control}
                  name="timeTrackingRemaining"
                  numberInput={true}
                  onChange={(e) => {
                    setTimeTracking({
                      ...timeTracking,
                      timeTrackingRemaining:
                        getValues("timeTrackingRemaining") || 0,
                    });
                  }}
                />
                {errors.timeTrackingRemaining && (
                  <p className="text-red-600 font-medium mt-2">
                    {errors.timeTrackingRemaining.message}
                  </p>
                )}
              </Col>
            </Row>
          </div>
        </Col>
      </Row>
      <div className="mb-6">
        <label
          htmlFor="description"
          className="block mb-2 text-sm font-semibold text-gray-900"
        >
          Description
        </label>
        <Editor
          apiKey="ka4359j8d9m8qkswsi2zvjs4pzb2fzsl6pbap06r9btfhxvd"
          onInit={(evt, editor) => (editorRef.current = editor)}
          init={{
            height: 400,
            menubar: false,
            plugins: [
              "advlist",
              "autolink",
              "lists",
              "link",
              "image",
              "charmap",
              "preview",
              "anchor",
              "searchreplace",
              "visualblocks",
              "code",
              "fullscreen",
              "insertdatetime",
              "media",
              "table",
              "code",
              "help",
              "wordcount",
            ],
            toolbar:
              "undo redo | blocks | " +
              "bold italic forecolor | alignleft aligncenter " +
              "alignright alignjustify | bullist numlist outdent indent | " +
              "removeformat | help",
            content_style:
              "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
          }}
        />
      </div>
    </form>
  );
}

export default memo(FormCreateTask);
