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
      taskHeight,
      arrowIndent
    );
  } else {
    [path, trianglePoints] = drownPathAndTriangleByType(
      taskFrom,
      taskTo,
      dependencyType,
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
  taskHeight: number,
  arrowIndent: number
) {
  switch (type) {
    case 'SS':
      return drownPathAndTriangleSS(taskFrom, taskTo, taskHeight, arrowIndent);
    case 'FF':
      return drownPathAndTriangleFF(taskFrom, taskTo, taskHeight, arrowIndent);
    case 'SF':
      return drownPathAndTriangleSF(taskFrom, taskTo, taskHeight, arrowIndent);
    case 'FS':
    default:
      return drownPathAndTriangle(taskFrom, taskTo, taskHeight, arrowIndent);
  }
}

function drownPathAndTriangleByTypeRTL(
  taskFrom: BarTask,
  taskTo: BarTask,
  type: DependencyType,
  taskHeight: number,
  arrowIndent: number
) {
  switch (type) {
    case 'SS':
      return drownPathAndTriangleSSRTL(taskFrom, taskTo, taskHeight, arrowIndent);
    case 'FF':
      return drownPathAndTriangleFFRTL(taskFrom, taskTo,  taskHeight, arrowIndent);
    case 'SF':
      return drownPathAndTriangleSFRTL(taskFrom, taskTo,  taskHeight, arrowIndent);
    case 'FS':
    default:
      return drownPathAndTriangleRTL(taskFrom, taskTo,  taskHeight, arrowIndent);
  }
}

// FS (Finish-to-Start) - default
function drownPathAndTriangle(
  taskFrom: BarTask,
  taskTo: BarTask,
  taskHeight: number,
  arrowIndent: number
) {
  const yFrom = taskFrom.y + taskHeight / 2;
  const yTo = taskTo.y + taskHeight / 2;
  const path = `M ${taskFrom.x2} ${yFrom} h ${arrowIndent} V ${yTo} H ${taskTo.x1}`;
  const trianglePoints = `${taskTo.x1},${yTo} ${taskTo.x1 - 5},${yTo - 5} ${taskTo.x1 - 5},${yTo + 5}`;
  return [path, trianglePoints];
}

// SS (Start-to-Start)
function drownPathAndTriangleSS(
  taskFrom: BarTask,
  taskTo: BarTask,
  taskHeight: number,
  arrowIndent: number
) {
  const yFrom = taskFrom.y + taskHeight / 2;
  const yTo = taskTo.y + taskHeight / 2;
  const path = `M ${taskFrom.x1} ${yFrom} h -${arrowIndent} V ${yTo} H ${taskTo.x1}`;
  const trianglePoints = `${taskTo.x1},${yTo} ${taskTo.x1 - 5},${yTo - 5} ${taskTo.x1 - 5},${yTo + 5}`;
  return [path, trianglePoints];
}

// FF (Finish-to-Finish)
function drownPathAndTriangleFF(
  taskFrom: BarTask,
  taskTo: BarTask,
  taskHeight: number,
  arrowIndent: number
) {
  const yFrom = taskFrom.y + taskHeight / 2;
  const yTo = taskTo.y + taskHeight / 2;
  const path = `M ${taskFrom.x2} ${yFrom} h ${arrowIndent} V ${yTo} H ${taskTo.x2}`;
  const trianglePoints = `${taskTo.x2},${yTo} ${taskTo.x2 + 5},${yTo - 5} ${taskTo.x2 + 5},${yTo + 5}`;
  return [path, trianglePoints];
}

// SF (Start-to-Finish)
function drownPathAndTriangleSF(
  taskFrom: BarTask,
  taskTo: BarTask,
  taskHeight: number,
  arrowIndent: number
) {
  const yFrom = taskFrom.y + taskHeight / 2;
  const yTo = taskTo.y + taskHeight / 2;
  const path = `M ${taskFrom.x1} ${yFrom} h -${arrowIndent} V ${yTo} H ${taskTo.x2}`;
  const trianglePoints = `${taskTo.x2},${yTo} ${taskTo.x2 + 5},${yTo - 5} ${taskTo.x2 + 5},${yTo + 5}`;
  return [path, trianglePoints];
}

// RTL versions
function drownPathAndTriangleRTL(
  taskFrom: BarTask,
  taskTo: BarTask,
  taskHeight: number,
  arrowIndent: number
) {
  const yFrom = taskFrom.y + taskHeight / 2;
  const yTo = taskTo.y + taskHeight / 2;
  const path = `M ${taskFrom.x1} ${yFrom} h -${arrowIndent} V ${yTo} H ${taskTo.x2}`;
  const trianglePoints = `${taskTo.x2},${yTo} ${taskTo.x2 + 5},${yTo - 5} ${taskTo.x2 + 5},${yTo + 5}`;
  return [path, trianglePoints];
}

function drownPathAndTriangleSSRTL(
  taskFrom: BarTask,
  taskTo: BarTask,
  taskHeight: number,
  arrowIndent: number
) {
  const yFrom = taskFrom.y + taskHeight / 2;
  const yTo = taskTo.y + taskHeight / 2;
  const path = `M ${taskFrom.x2} ${yFrom} h ${arrowIndent} V ${yTo} H ${taskTo.x2}`;
  const trianglePoints = `${taskTo.x2},${yTo} ${taskTo.x2 + 5},${yTo - 5} ${taskTo.x2 + 5},${yTo + 5}`;
  return [path, trianglePoints];
}

function drownPathAndTriangleFFRTL(
  taskFrom: BarTask,
  taskTo: BarTask,
  taskHeight: number,
  arrowIndent: number
) {
  const yFrom = taskFrom.y + taskHeight / 2;
  const yTo = taskTo.y + taskHeight / 2;
  const path = `M ${taskFrom.x1} ${yFrom} h -${arrowIndent} V ${yTo} H ${taskTo.x1}`;
  const trianglePoints = `${taskTo.x1},${yTo} ${taskTo.x1 - 5},${yTo - 5} ${taskTo.x1 - 5},${yTo + 5}`;
  return [path, trianglePoints];
}

function drownPathAndTriangleSFRTL(
  taskFrom: BarTask,
  taskTo: BarTask,
  taskHeight: number,
  arrowIndent: number
) {
  const yFrom = taskFrom.y + taskHeight / 2;
  const yTo = taskTo.y + taskHeight / 2;
  const path = `M ${taskFrom.x2} ${yFrom} h ${arrowIndent} V ${yTo} H ${taskTo.x1}`;
  const trianglePoints = `${taskTo.x1},${yTo} ${taskTo.x1 - 5},${yTo - 5} ${taskTo.x1 - 5},${yTo + 5}`;
  return [path, trianglePoints];
}
