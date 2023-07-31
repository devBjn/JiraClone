import {
  faBookmark,
  faCircleExclamation,
  faClock,
  faLink,
  faPaperPlane,
  faTrashCan,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { memo, useRef, useState } from "react";
import { Button, Col, Input, Modal, Row, Select, Slider } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { closeModalDetail } from "../../slices/modalSlice";
import prase from "html-react-parser";
import { Editor } from "@tinymce/tinymce-react";
import {
  changeAssignees,
  changeDetail,
  handleUpdateTask,
  removeUserFromTask,
} from "../../slices/taskSlice";
import { getProjectDetail } from "../../slices/projectSlice";
import { apiRemoveTask } from "../../apis/taskAPI";
import AlertSuccess from "../Alert/AlertSuccess";
import AlertError from "../Alert/AlertError";
import AlertConfirm from "../Alert/AlertConfirm";
import CommentList from "../Comment/CommentList";

function ModalDetail() {
  const { showModalDetail } = useSelector((state) => state.modalReducer);
  const [visibleEditor, setVisibleEditor] = useState(false);
  const { taskDetail, status, priority, taskType } = useSelector(
    (state) => state.taskReducer
  );
  const { projectDetail } = useSelector((state) => state.projectReducer);
  const editorRef = useRef();

  const dispatch = useDispatch();

  const handleRemoveTask = (taskId) => {
    try {
      AlertConfirm().then(async (result) => {
        if (result.isConfirmed) {
          const data = await apiRemoveTask(taskId);
          if (data) {
            AlertSuccess("Remove a task successfully !!!");
            dispatch(closeModalDetail());
            dispatch(getProjectDetail(taskDetail.projectId));
          }
          return data;
        }
      });
    } catch (error) {
      AlertError(error?.response?.data?.message);
    }
  };
  const handleCancel = () => {
    dispatch(closeModalDetail());
  };
  const handleOk = () => {
    dispatch(handleUpdateTask(taskDetail));
    dispatch(getProjectDetail(taskDetail.projectId));
    dispatch(closeModalDetail());
  };
  return (
    <Modal
      centered
      width={1100}
      open={showModalDetail}
      closeIcon={
        <div onClick={() => dispatch(closeModalDetail())}>
          <FontAwesomeIcon icon={faXmark} />
        </div>
      }
      footer={[
        <Button onClick={handleCancel}>Cancel</Button>,
        <Button
          style={{ background: "#1877ff", color: "white" }}
          onClick={handleOk}
        >
          Submit
        </Button>,
      ]}
      maskClosable={true}
      title={
        <div className=" flex items-start justify-between py-5 pe-5  rounded-t">
          <div className="task-title flex items-center">
            <Select
              value={taskDetail?.typeId}
              onChange={(value) => {
                dispatch(
                  changeDetail({
                    name: "typeId",
                    value,
                  })
                );
              }}
              showArrow={false}
              style={{
                height: 14,
                width: 200,
              }}
              bordered={false}
              options={taskType?.map((type) => {
                return {
                  label: (
                    <div className="flex items-center gap-2">
                      <FontAwesomeIcon
                        color={type.id === 1 ? "red" : "green"}
                        icon={type.id === 1 ? faCircleExclamation : faBookmark}
                      />
                      <p className="font-semibold text-base">
                        {taskDetail?.taskName}
                      </p>
                    </div>
                  ),
                  value: type.id,
                };
              })}
            />
          </div>
          <div className="task-click flex items-center">
            <div>
              <FontAwesomeIcon className="me-2" icon={faPaperPlane} />
              <span className="pe-5">Give feedback</span>
            </div>
            <div>
              <FontAwesomeIcon className="me-2" icon={faLink} />
              <span className="pe-5">Copy link</span>
            </div>
            <FontAwesomeIcon
              className="cursor-pointer"
              onClick={() => {
                handleRemoveTask(taskDetail?.taskId);
              }}
              icon={faTrashCan}
            />
          </div>
        </div>
      }
    >
      <div className="relative w-auto my-6 mx-auto">
        <div className="  px-5 ">
          <div className="modal-body ">
            <div className="container-xl">
              <div className="grid grid-cols-3 gap-4">
                <div className="col-span-2 ">
                  <div className="description">
                    <p className="font-medium text-lg">Description</p>
                    {visibleEditor ? (
                      <div className="mt-2">
                        <Editor
                          apiKey="ka4359j8d9m8qkswsi2zvjs4pzb2fzsl6pbap06r9btfhxvd"
                          onInit={(evt, editor) => (editorRef.current = editor)}
                          initialValue={taskDetail?.description}
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
                        <button
                          type="submit"
                          onClick={() => {
                            setVisibleEditor(false);
                            dispatch(
                              changeDetail({
                                name: "description",
                                value: editorRef.current.getContent(),
                              })
                            );
                          }}
                          className="mt-2 text-white  focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center transition-all bg-blue-600 hover:bg-blue-800 "
                        >
                          Save
                        </button>
                        <button
                          type="submit"
                          onClick={() => setVisibleEditor(!visibleEditor)}
                          className="ms-1 text-black bg-gray-200 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center transition-all  hover:text-black hover:bg-gray-500 "
                        >
                          Cancel
                        </button>
                      </div>
                    ) : (
                      <div
                        className="mt-1"
                        onClick={() => setVisibleEditor(true)}
                      >
                        {taskDetail?.description ? (
                          prase(`${taskDetail?.description}`)
                        ) : (
                          <p className="text-gray-700 cursor-pointer">
                            Add some description....
                          </p>
                        )}
                      </div>
                    )}
                  </div>
                  <CommentList taskId={taskDetail?.taskId} />
                </div>
                <div className="col-span-1">
                  <div className="status mb-3">
                    <h6 className="font-semibold mb-1">STATUS</h6>
                    <Select
                      value={taskDetail?.statusId}
                      onChange={(value) => {
                        dispatch(
                          changeDetail({
                            name: "statusId",
                            value,
                          })
                        );
                      }}
                      style={{
                        width: "100%",
                      }}
                      options={status?.map((status) => {
                        return {
                          label: status.statusName,
                          value: status.statusId,
                        };
                      })}
                    />
                  </div>
                  <div className="assignees mb-3">
                    <h6 className="font-semibold mb-1">ASSIGNEES</h6>
                    <div className="flex flex-wrap items-center">
                      {taskDetail?.assigness?.map((member) => {
                        return (
                          <div
                            className="item mb-2 flex items-center gap-2"
                            key={member.id}
                          >
                            <div className="avatar">
                              <img src={member.avatar} alt="" />
                            </div>
                            <p className="font-medium">{member.name}</p>
                            <div
                              onClick={() => {
                                dispatch(removeUserFromTask(member.id));
                              }}
                            >
                              <FontAwesomeIcon
                                className="cursor-pointer"
                                icon={faXmark}
                              />
                            </div>
                          </div>
                        );
                      })}

                      <div className="flex items-center gap-2 text-blue-800 cursor-pointer">
                        <Select
                          placeholder="Please select"
                          optionFilterProp="label"
                          showArrow={false}
                          value="+ Add more..."
                          onSelect={(value) => {
                            let userSelected = projectDetail?.members?.find(
                              (mem) => mem.userId === value
                            );
                            userSelected = {
                              ...userSelected,
                              id: userSelected?.userId,
                            };
                            dispatch(changeAssignees(userSelected));
                          }}
                          options={projectDetail?.members
                            ?.filter((member) => {
                              let index = taskDetail?.assigness?.findIndex(
                                (us) => us.id === member.userId
                              );
                              if (index !== -1) {
                                return false;
                              }
                              return true;
                            })
                            .map((user) => {
                              return {
                                label: user.name,
                                value: user.userId,
                              };
                            })}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="priority mb-5">
                    <h6 className="font-semibold mb-1">PRIORITY</h6>
                    <Select
                      onChange={(value) => {
                        dispatch(
                          changeDetail({
                            name: "priorityId",
                            value,
                          })
                        );
                      }}
                      value={taskDetail?.priorityId}
                      options={priority?.map((priority) => {
                        return {
                          label: priority.priority,
                          value: priority.priorityId,
                        };
                      })}
                    />
                  </div>
                  <div className="estimate mb-5">
                    <h6 className="font-semibold mb-1">
                      ORIGINAL ESTIMATE (HOURS)
                    </h6>
                    <Input
                      name="originalEstimate"
                      onChange={(e) => {
                        dispatch(
                          changeDetail({
                            name: "originalEstimate",
                            value: e.target.value,
                          })
                        );
                      }}
                      value={taskDetail?.originalEstimate}
                    />
                  </div>
                  <div className="time-tracking">
                    <h6 className="font-semibold mb-1">TIME TRACKING</h6>
                    <div className="flex items-center">
                      <FontAwesomeIcon icon={faClock} />{" "}
                      <div className="w-full">
                        <Slider
                          handleStyle={{
                            height: "20px",
                          }}
                          value={taskDetail?.timeTrackingSpent}
                          max={
                            Number(taskDetail?.timeTrackingSpent) +
                            Number(taskDetail?.timeTrackingRemaining)
                          }
                        />
                        <div className="flex justify-between items-center">
                          <p className="font-medium">
                            {taskDetail?.timeTrackingSpent}h logged
                          </p>
                          <p className="font-medium">
                            {taskDetail?.timeTrackingRemaining}h remaining
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="mt-3">
                      <Row justify={"space-between"}>
                        <Col span={11}>
                          <label
                            htmlFor="timeTrackingSpent"
                            className="block mb-2 text-sm font-semibold text-gray-900 "
                          >
                            Time Spent
                          </label>
                          <Input
                            value={taskDetail?.timeTrackingSpent}
                            onChange={(e) => {
                              dispatch(
                                changeDetail({
                                  name: "timeTrackingSpent",
                                  value: e.target.value,
                                })
                              );
                            }}
                          />
                        </Col>
                        <Col span={11}>
                          <label
                            htmlFor="timeTrackingRemaining"
                            className="block mb-2 text-sm font-semibold text-gray-900 "
                          >
                            Time Remaining
                          </label>
                          <Input
                            value={taskDetail?.timeTrackingRemaining}
                            onChange={(e) => {
                              dispatch(
                                changeDetail({
                                  name: "timeTrackingRemaining",
                                  value: e.target.value,
                                })
                              );
                            }}
                          />
                        </Col>
                      </Row>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
}

export default memo(ModalDetail);
