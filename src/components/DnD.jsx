import React, { useState } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import _ from "lodash";

export default function DnD() {
  const [state, setState] = useState({
    toDo: {
      id: "toDo",
      items: [
        { id: "1", taskName: "Task 1" },
        { id: "2", taskName: "Task 2" },
        { id: "3", taskName: "Task 3" },
      ],
    },
    inProgress: {
      id: "inProgress",
      items: [
        { id: "4", taskName: "Task 4" },
        { id: "5", taskName: "Task 5" },
        { id: "6", taskName: "Task 6" },
      ],
    },
    done: {
      id: "done",
      items: [
        { id: "7", taskName: "Task 7" },
        { id: "8", taskName: "Task 8" },
        { id: "9", taskName: "Task 9" },
      ],
    },
  });

  const handleDragEnd = (res) => {
    const { destination, source } = res;
    console.log("destination", destination);
    console.log("source", source);
    if (!destination) return;
    if (
      destination.index === source.index &&
      destination.droppableId === source.droppableId
    )
      return;

    //get drag item
    let dragItem = { ...state[source.droppableId].items[source.index] };
    console.log("dragItem", dragItem);

    //push drag item into index of destination
    state[destination.droppableId].items.splice(destination.index, 0, dragItem);

    //remove drag item in source
    let index = state[source.droppableId].items.findIndex(
      (item) => item.id === dragItem.id
    );

    state[source.droppableId].items.splice(index, 1);

    setState(state);
  };

  return (
    <div>
      <h1 className="text-center">Demo DragDropDnD</h1>
      <DragDropContext onDragEnd={handleDragEnd}>
        <div className="grid grid-cols-3 gap-4">
          {_.map(state, (statusTask, index) => {
            return (
              <Droppable key={index} droppableId={statusTask.id}>
                {(provided) => {
                  return (
                    <>
                      <div
                        key={index}
                        ref={provided.innerRef}
                        {...provided.droppableProps}
                        className="bg-black p-8"
                      >
                        <h3 className="text-red-500 text-center">
                          {statusTask.id}
                        </h3>
                        {statusTask.items?.map((item, index) => {
                          return (
                            <Draggable
                              key={item.id}
                              index={index}
                              draggableId={item.id}
                            >
                              {(provided) => {
                                return (
                                  <div
                                    ref={provided.innerRef}
                                    {...provided.draggableProps}
                                    {...provided.dragHandleProps}
                                    className="mt-2 p-4 bg-white text-center"
                                  >
                                    {item.taskName}
                                  </div>
                                );
                              }}
                            </Draggable>
                          );
                        })}
                        {provided.placeholder}
                      </div>
                    </>
                  );
                }}
              </Droppable>
            );
          })}
        </div>
      </DragDropContext>
    </div>
  );
}
