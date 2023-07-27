import React from "react";
import ModalDetail from "../../components/Modal/ModalDetail";
import { Avatar } from "antd";
import { useDispatch } from "react-redux";
import { getTaskDetail } from "../../slices/taskSlice";
import { openModalDetail } from "../../slices/modalSlice";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { apiUpdateStatusTask } from "../../apis/taskAPI";
import { getProjectDetail } from "../../slices/projectSlice";
import AlertError from "../../components/Alert/AlertError";

export default function ContentDetail({ taskList }) {
  const dispatch = useDispatch();
  const handleDragEnd = async (result) => {
    try {
      const { source, destination } = result;
      const { projectId, taskId } = JSON.parse(result.draggableId);
      console.log(result);
      if (!destination) return;
      if (
        destination.index === source.index &&
        destination.droppableId === source.droppableId
      )
        return;
      const data = await apiUpdateStatusTask(taskId, destination.droppableId);
      if (data) {
        dispatch(getProjectDetail(projectId));
      }
    } catch (error) {
      // AlertError(error?.response?.data?.message);
      console.log(error);
    }
  };

  return (
    <>
      <div className="content flex">
        <DragDropContext onDragEnd={handleDragEnd}>
          {taskList?.map((task, index) => {
            return (
              <Droppable key={index} droppableId={task.statusId}>
                {(provided) => {
                  return (
                    <div className="card w-[17.5rem]">
                      <div className="card-header h-10 text-sm font-semibold text-black">
                        {task.statusName}
                      </div>
                      <div
                        key={task.statusId}
                        ref={provided.innerRef}
                        {...provided.droppableProps}
                        className="list-group list-group-flush h-full"
                      >
                        {task?.lstTaskDeTail?.map((taskDetail, index) => {
                          return (
                            <Draggable
                              index={index}
                              key={taskDetail.taskId.toString()}
                              draggableId={JSON.stringify({
                                projectId: taskDetail.projectId,
                                taskId: taskDetail.taskId,
                              })}
                            >
                              {(provided) => {
                                return (
                                  <div
                                    key={index}
                                    className="list-group-item cursor-pointer"
                                    onClick={() => {
                                      dispatch(
                                        getTaskDetail(taskDetail.taskId)
                                      );
                                      dispatch(openModalDetail());
                                    }}
                                    ref={provided.innerRef}
                                    {...provided.draggableProps}
                                    {...provided.dragHandleProps}
                                  >
                                    <p className="font-medium text-md mb-2">
                                      {taskDetail.taskName}
                                    </p>
                                    <div className=" flex justify-between items-center">
                                      <div className="leading-10">
                                        <p
                                          className={`${
                                            taskDetail.priorityTask.priority ===
                                            "Medium"
                                              ? "text-orange-700"
                                              : taskDetail.priorityTask
                                                  .priority === "High"
                                              ? "text-red-700"
                                              : taskDetail.priorityTask
                                                  .priority === "Low"
                                              ? "text-green-700"
                                              : "text-green-500"
                                          } font-semibold text-sm`}
                                        >
                                          {taskDetail.priorityTask.priority}
                                        </p>
                                      </div>
                                      <div className="block-right">
                                        <div className="avatar-group flex">
                                          <Avatar.Group
                                            maxCount={2}
                                            size="medium"
                                            maxStyle={{
                                              color: "#f56a00",
                                              backgroundColor: "#fde3cf",
                                            }}
                                          >
                                            {taskDetail.assigness.length > 0 &&
                                              taskDetail?.assigness?.map(
                                                (user) => {
                                                  return (
                                                    <Avatar
                                                      size="medium"
                                                      key={user.id}
                                                      src={user.avatar}
                                                    />
                                                  );
                                                }
                                              )}
                                          </Avatar.Group>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                );
                              }}
                            </Draggable>
                          );
                        })}
                        {provided.placeholder}
                      </div>
                    </div>
                  );
                }}
              </Droppable>
            );
          })}
        </DragDropContext>
      </div>
      <ModalDetail />
    </>
  );
}
