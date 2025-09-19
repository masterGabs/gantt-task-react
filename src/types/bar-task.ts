
import { Task, TaskType, DependencyType } from "./public-types";

export interface BarTaskDependency {
  index: number; // index of the dependent task in the barTasks array
  type: DependencyType;
}

export interface BarTask extends Task {
  index: number;
  typeInternal: TaskTypeInternal;
  x1: number;
  x2: number;
  y: number;
  height: number;
  progressX: number;
  progressWidth: number;
  barCornerRadius: number;
  handleWidth: number;
  barChildren: BarTaskDependency[];
  styles: {
    backgroundColor: string;
    backgroundSelectedColor: string;
    progressColor: string;
    progressSelectedColor: string;
  };
}

export type TaskTypeInternal = TaskType | "smalltask";
