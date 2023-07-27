import React, { useRef, useState } from "react";
import _ from "lodash";

export default function DragDrop() {
  const [taskList, setTaskList] = useState([
    { id: 1, name: "task 1" },
    { id: 2, name: "task 2" },
    { id: 3, name: "task 3" },
    { id: 4, name: "task 4" },
    { id: 5, name: "task 5" },
  ]);
  const tagDrag = useRef({});

  const handleDragStart = (e, item, index) => {
    tagDrag.current = item;
  };

  const handleDragEnter = (e, item, index) => {
    const taskListUpdate = [...taskList];

    //get task and index drag
    let indexTagDrag = taskListUpdate.findIndex(
      (task) => task.id === tagDrag.current.id
    );
    //get task and index drop
    let indexTagDrop = taskListUpdate.findIndex((task) => task.id === item.id);
    //create a temp variable
    let temp = taskListUpdate[indexTagDrag];
    taskListUpdate[indexTagDrag] = taskListUpdate[indexTagDrop];
    taskListUpdate[indexTagDrop] = temp;
    setTaskList(taskListUpdate);
  };

  // khi the buong ra
  const handleDragEnd = (e) => {};

  return (
    <div className="bg-green-700 mx-auto p-48">
      {taskList.map((item, index) => {
        let cssDragTag = item.id === tagDrag.current.id ? "dragTag" : "";
        return (
          <div
            className={`mx-auto bg-red-200 m-2 h-8 ${cssDragTag}`}
            draggable="true"
            onDragStart={(e) => handleDragStart(e, item, index)}
            onDragEnter={(e) => handleDragEnter(e, item, index)}
            onDragEnd={(e) => handleDragEnd(e)}
            key={index}
          >
            {item.name}
          </div>
        );
      })}
    </div>
  );
}
