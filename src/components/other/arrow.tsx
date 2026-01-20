import React from "react";
import { BarTask } from "../../types/bar-task";
import { DependencyType } from "../../types/public-types";

type ArrowProps = {
  taskFrom: BarTask;
  taskTo: BarTask;
  dependencyType: DependencyType;
  rowHeight: number;
  taskHeight: number;
  arrowIndent: number;
  rtl: boolean;
};

export const Arrow: React.FC<ArrowProps> = ({
  taskFrom,
  taskTo,
  dependencyType,
  rowHeight,
  taskHeight,
  arrowIndent,
  rtl,
}) => {
  let path: string;
  let trianglePoints: string;
  if (rtl) {
    [path, trianglePoints] = drownPathAndTriangleByTypeRTL(
      taskFrom,
      taskTo,
      dependencyType,
      rowHeight,
      taskHeight,
      arrowIndent
    );
  } else {
    [path, trianglePoints] = drownPathAndTriangleByType(
      taskFrom,
      taskTo,
      dependencyType,
      rowHeight,
      taskHeight,
      arrowIndent
    );
  }

  return (
    <g className="arrow">
      <path strokeWidth="1.5" d={path} fill="none" />
      <polygon points={trianglePoints} />
    </g>
  );
};


// Helper functions for each dependency type
function drownPathAndTriangleByType(
  taskFrom: BarTask,
  taskTo: BarTask,
  type: DependencyType,
  rowHeight: number,
  taskHeight: number,
  arrowIndent: number
) {
  switch (type) {
    case 'SS':
      return drownPathAndTriangleSS(taskFrom, taskTo, rowHeight, taskHeight, arrowIndent);
    case 'FF':
      return drownPathAndTriangleFF(taskFrom, taskTo, rowHeight, taskHeight, arrowIndent);
    case 'SF':
      return drownPathAndTriangleSF(taskFrom, taskTo, rowHeight, taskHeight, arrowIndent);
    case 'FS':
    default:
      return drownPathAndTriangle(taskFrom, taskTo, rowHeight, taskHeight, arrowIndent);
  }
}

function drownPathAndTriangleByTypeRTL(
  taskFrom: BarTask,
  taskTo: BarTask,
  type: DependencyType,
  rowHeight: number,
  taskHeight: number,
  arrowIndent: number
) {
  switch (type) {
    case 'SS':
      return drownPathAndTriangleSSRTL(taskFrom, taskTo, rowHeight, taskHeight, arrowIndent);
    case 'FF':
      return drownPathAndTriangleFFRTL(taskFrom, taskTo, rowHeight, taskHeight, arrowIndent);
    case 'SF':
      return drownPathAndTriangleSFRTL(taskFrom, taskTo, rowHeight, taskHeight, arrowIndent);
    case 'FS':
    default:
      return drownPathAndTriangleRTL(taskFrom, taskTo, rowHeight, taskHeight, arrowIndent);
  }
}

// FS (Finish-to-Start) - default
const drownPathAndTriangle = (
  taskFrom: BarTask,
  taskTo: BarTask,
  rowHeight: number,
  taskHeight: number,
  arrowIndent: number
) => {
  const indexCompare = taskFrom.index > taskTo.index ? -1 : 1;
  const taskToEndPosition = taskTo.y + taskHeight / 2;
  const taskFromEndPosition = taskFrom.x2 + arrowIndent * 2;
  const taskFromHorizontalOffsetValue =
    taskFromEndPosition < taskTo.x1 ? "" : `H ${taskTo.x1 - arrowIndent}`;
  const taskToHorizontalOffsetValue =
    taskFromEndPosition > taskTo.x1
      ? arrowIndent
      : taskTo.x1 - taskFrom.x2 - arrowIndent;

  const path = `M ${taskFrom.x2} ${taskFrom.y + taskHeight / 2} 
  h ${arrowIndent} 
  v ${(indexCompare * rowHeight) / 2} 
  ${taskFromHorizontalOffsetValue}
  V ${taskToEndPosition} 
  h ${taskToHorizontalOffsetValue}`;

  const trianglePoints = `${taskTo.x1},${taskToEndPosition} 
  ${taskTo.x1 - 5},${taskToEndPosition - 5} 
  ${taskTo.x1 - 5},${taskToEndPosition + 5}`;
  return [path, trianglePoints];
};

// SS (Start-to-Start)
function drownPathAndTriangleSS(
  taskFrom: BarTask,
  taskTo: BarTask,
  rowHeight: number,
  taskHeight: number,
  arrowIndent: number
) {
  const indexCompare = taskFrom.index > taskTo.index ? -1 : 1;
  const taskToEndPosition = taskTo.y + taskHeight / 2;
  const taskFromEndPosition = taskFrom.x1 - arrowIndent * 2;
  const taskFromHorizontalOffsetValue =
    taskFromEndPosition < taskTo.x1 ? "" : `H ${taskTo.x1 - arrowIndent}`;
  const taskToHorizontalOffsetValue =
    taskFromEndPosition > taskTo.x1
      ? arrowIndent
      : taskTo.x1 - taskFrom.x1 + arrowIndent;
  const path = `M ${taskFrom.x1} ${taskFrom.y + taskHeight / 2} 
  h -${arrowIndent} 
  v ${(indexCompare * rowHeight) / 2} 
  ${taskFromHorizontalOffsetValue}
  V ${taskToEndPosition} 
  h ${taskToHorizontalOffsetValue}`;
  const trianglePoints = `${taskTo.x1},${taskToEndPosition} 
  ${taskTo.x1 - 5},${taskToEndPosition - 5} 
  ${taskTo.x1 - 5},${taskToEndPosition + 5}`;
  return [path, trianglePoints];
}

// FF (Finish-to-Finish)
function drownPathAndTriangleFF(
  taskFrom: BarTask,
  taskTo: BarTask,
  rowHeight: number,
  taskHeight: number,
  arrowIndent: number
) {
  const indexCompare = taskFrom.index > taskTo.index ? -1 : 1;
  const taskToEndPosition = taskTo.y + taskHeight / 2;
  const taskFromEndPosition = taskFrom.x2 + arrowIndent * 2;
  const taskFromHorizontalOffsetValue =
    taskFromEndPosition > taskTo.x2 ? "" : `H ${taskTo.x2 + arrowIndent}`;
  const taskToHorizontalOffsetValue =
    taskFromEndPosition < taskTo.x2
      ? -arrowIndent
      : taskTo.x2 - taskFrom.x2 - arrowIndent;
  const path = `M ${taskFrom.x2} ${taskFrom.y + taskHeight / 2} 
  h ${arrowIndent} 
  v ${(indexCompare * rowHeight) / 2} 
  ${taskFromHorizontalOffsetValue}
  V ${taskToEndPosition} 
  h ${taskToHorizontalOffsetValue}`;
  const trianglePoints = `${taskTo.x2},${taskToEndPosition} 
  ${taskTo.x2 + 5},${taskToEndPosition - 5} 
  ${taskTo.x2 + 5},${taskToEndPosition + 5}`;
  return [path, trianglePoints];
}

// SF (Start-to-Finish)
function drownPathAndTriangleSF(
  taskFrom: BarTask,
  taskTo: BarTask,
  rowHeight: number,
  taskHeight: number,
  arrowIndent: number
) {
  const indexCompare = taskFrom.index > taskTo.index ? -1 : 1;
  const taskToEndPosition = taskTo.y + taskHeight / 2;
  const taskFromEndPosition = taskFrom.x1 - arrowIndent * 2;
  const taskFromHorizontalOffsetValue =
    taskFromEndPosition > taskTo.x2 ? "" : `H ${taskTo.x2 + arrowIndent}`;
  const taskToHorizontalOffsetValue =
    taskFromEndPosition < taskTo.x2
      ? -arrowIndent
      : taskTo.x2 - taskFrom.x1 + arrowIndent;
  const path = `M ${taskFrom.x1} ${taskFrom.y + taskHeight / 2} 
  h -${arrowIndent} 
  v ${(indexCompare * rowHeight) / 2} 
  ${taskFromHorizontalOffsetValue}
  V ${taskToEndPosition} 
  h ${taskToHorizontalOffsetValue}`;
  const trianglePoints = `${taskTo.x2},${taskToEndPosition} 
  ${taskTo.x2 + 5},${taskToEndPosition - 5} 
  ${taskTo.x2 + 5},${taskToEndPosition + 5}`;
  return [path, trianglePoints];
}

// RTL versions
function drownPathAndTriangleRTL(
  taskFrom: BarTask,
  taskTo: BarTask,
  rowHeight: number,
  taskHeight: number,
  arrowIndent: number
) {
  const indexCompare = taskFrom.index > taskTo.index ? -1 : 1;
  const taskToEndPosition = taskTo.y + taskHeight / 2;
  const taskFromEndPosition = taskFrom.x1 - arrowIndent * 2;
  const taskFromHorizontalOffsetValue =
    taskFromEndPosition > taskTo.x2 ? "" : `H ${taskTo.x2 + arrowIndent}`;
  const taskToHorizontalOffsetValue =
    taskFromEndPosition < taskTo.x2
      ? -arrowIndent
      : taskTo.x2 - taskFrom.x1 + arrowIndent;
  const path = `M ${taskFrom.x1} ${taskFrom.y + taskHeight / 2} 
  h -${arrowIndent} 
  v ${(indexCompare * rowHeight) / 2} 
  ${taskFromHorizontalOffsetValue}
  V ${taskToEndPosition} 
  h ${taskToHorizontalOffsetValue}`;
  const trianglePoints = `${taskTo.x2},${taskToEndPosition} 
  ${taskTo.x2 + 5},${taskToEndPosition - 5} 
  ${taskTo.x2 + 5},${taskToEndPosition + 5}`;
  return [path, trianglePoints];
}

function drownPathAndTriangleSSRTL(
  taskFrom: BarTask,
  taskTo: BarTask,
  rowHeight: number,
  taskHeight: number,
  arrowIndent: number
) {
  const indexCompare = taskFrom.index > taskTo.index ? -1 : 1;
  const taskToEndPosition = taskTo.y + taskHeight / 2;
  const taskFromEndPosition = taskFrom.x2 + arrowIndent * 2;
  const taskFromHorizontalOffsetValue = ""
    // taskFromEndPosition < taskTo.x2 ? "" : `H ${taskTo.x2 - arrowIndent}`;
  const taskToHorizontalOffsetValue =
    taskFromEndPosition > taskTo.x2
      ? arrowIndent
      : taskTo.x2 - taskFrom.x2 - arrowIndent;
  const path = `M ${taskFrom.x2} ${taskFrom.y + taskHeight / 2} 
  h ${arrowIndent} 
  v ${(indexCompare * rowHeight) / 2} 
  ${taskFromHorizontalOffsetValue}
  V ${taskToEndPosition} 
  h ${taskToHorizontalOffsetValue}`;
  const trianglePoints = `${taskTo.x2},${taskToEndPosition} 
  ${taskTo.x2 + 5},${taskToEndPosition - 5} 
  ${taskTo.x2 + 5},${taskToEndPosition + 5}`;
  return [path, trianglePoints];
}

function drownPathAndTriangleFFRTL(
  taskFrom: BarTask,
  taskTo: BarTask,
  rowHeight: number,
  taskHeight: number,
  arrowIndent: number
) {
  const indexCompare = taskFrom.index > taskTo.index ? -1 : 1;
  const taskToEndPosition = taskTo.y + taskHeight / 2;
  const taskFromEndPosition = taskFrom.x1 - arrowIndent * 2;
  const taskFromHorizontalOffsetValue =
    taskFromEndPosition > taskTo.x1 ? "" : `H ${taskTo.x1 + arrowIndent}`;
  const taskToHorizontalOffsetValue =
    taskFromEndPosition < taskTo.x1
      ? -arrowIndent
      : taskTo.x1 - taskFrom.x1 + arrowIndent;
  const path = `M ${taskFrom.x1} ${taskFrom.y + taskHeight / 2} 
  h -${arrowIndent} 
  v ${(indexCompare * rowHeight) / 2} 
  ${taskFromHorizontalOffsetValue}
  V ${taskToEndPosition} 
  h ${taskToHorizontalOffsetValue}`;
  const trianglePoints = `${taskTo.x1},${taskToEndPosition} 
  ${taskTo.x1 - 5},${taskToEndPosition - 5} 
  ${taskTo.x1 - 5},${taskToEndPosition + 5}`;
  return [path, trianglePoints];
}

function drownPathAndTriangleSFRTL(
  taskFrom: BarTask,
  taskTo: BarTask,
  rowHeight: number,
  taskHeight: number,
  arrowIndent: number
) {
  const indexCompare = taskFrom.index > taskTo.index ? -1 : 1;
  const taskToEndPosition = taskTo.y + taskHeight / 2;
  const taskFromEndPosition = taskFrom.x2 + arrowIndent * 2;
  const taskFromHorizontalOffsetValue =
    taskFromEndPosition < taskTo.x1 ? "" : `H ${taskTo.x1 - arrowIndent}`;
  const taskToHorizontalOffsetValue =
    taskFromEndPosition > taskTo.x1
      ? arrowIndent
      : taskTo.x1 - taskFrom.x2 - arrowIndent;
  const path = `M ${taskFrom.x2} ${taskFrom.y + taskHeight / 2} 
  h ${arrowIndent} 
  v ${(indexCompare * rowHeight) / 2} 
  ${taskFromHorizontalOffsetValue}
  V ${taskToEndPosition} 
  h ${taskToHorizontalOffsetValue}`;
  const trianglePoints = `${taskTo.x1},${taskToEndPosition} 
  ${taskTo.x1 - 5},${taskToEndPosition - 5} 
  ${taskTo.x1 - 5},${taskToEndPosition + 5}`;
  return [path, trianglePoints];
}
