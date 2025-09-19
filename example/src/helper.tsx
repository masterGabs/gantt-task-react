import { Task } from "../../src/types/public-types";

export function initTasks() {
  const currentDate = new Date();
  const tasks: Task[] = [
    // Project Alpha - illustrates FS and SS
    {
      start: new Date(currentDate.getFullYear(), currentDate.getMonth(), 1),
      end: new Date(currentDate.getFullYear(), currentDate.getMonth(), 10),
      name: "Project Alpha",
      id: "ProjectAlpha",
      progress: 40,
      type: "project",
      hideChildren: false,
      displayOrder: 1,
    },
    {
      start: new Date(currentDate.getFullYear(), currentDate.getMonth(), 1),
      end: new Date(currentDate.getFullYear(), currentDate.getMonth(), 3),
      name: "Alpha - Planning",
      id: "AlphaTask1",
      progress: 100,
      type: "task",
      project: "ProjectAlpha",
      displayOrder: 2,
    },
    {
      start: new Date(currentDate.getFullYear(), currentDate.getMonth(), 3),
      end: new Date(currentDate.getFullYear(), currentDate.getMonth(), 6),
      name: "Alpha - Design",
      id: "AlphaTask2",
      progress: 60,
      dependencies: [{ id: "AlphaTask1", type: "FS" }],
      type: "task",
      project: "ProjectAlpha",
      displayOrder: 3,
    },
    {
      start: new Date(currentDate.getFullYear(), currentDate.getMonth(), 3),
      end: new Date(currentDate.getFullYear(), currentDate.getMonth(), 7),
      name: "Alpha - Research",
      id: "AlphaTask3",
      progress: 30,
      dependencies: [{ id: "AlphaTask1", type: "SS" }],
      type: "task",
      project: "ProjectAlpha",
      displayOrder: 4,
    },
    {
      start: new Date(currentDate.getFullYear(), currentDate.getMonth(), 7),
      end: new Date(currentDate.getFullYear(), currentDate.getMonth(), 10),
      name: "Alpha - Review",
      id: "AlphaTask4",
      progress: 0,
      dependencies: [
        { id: "AlphaTask2", type: "FS" },
        { id: "AlphaTask3", type: "FS" },
      ],
      type: "task",
      project: "ProjectAlpha",
      displayOrder: 5,
    },

    // Project Beta - illustrates FF and SF
    {
      start: new Date(currentDate.getFullYear(), currentDate.getMonth(), 5),
      end: new Date(currentDate.getFullYear(), currentDate.getMonth(), 20),
      name: "Project Beta",
      id: "ProjectBeta",
      progress: 20,
      type: "project",
      hideChildren: false,
      displayOrder: 6,
    },
    {
      start: new Date(currentDate.getFullYear(), currentDate.getMonth(), 5),
      end: new Date(currentDate.getFullYear(), currentDate.getMonth(), 10),
      name: "Beta - Spec",
      id: "BetaTask1",
      progress: 100,
      type: "task",
      project: "ProjectBeta",
      displayOrder: 7,
    },
    {
      start: new Date(currentDate.getFullYear(), currentDate.getMonth(), 10),
      end: new Date(currentDate.getFullYear(), currentDate.getMonth(), 15),
      name: "Beta - Implementation",
      id: "BetaTask2",
      progress: 50,
      dependencies: [{ id: "BetaTask1", type: "FS" }],
      type: "task",
      project: "ProjectBeta",
      displayOrder: 8,
    },
    {
      start: new Date(currentDate.getFullYear(), currentDate.getMonth(), 15),
      end: new Date(currentDate.getFullYear(), currentDate.getMonth(), 18),
      name: "Beta - QA",
      id: "BetaTask3",
      progress: 0,
      dependencies: [
        { id: "BetaTask2", type: "FF" },
      ],
      type: "task",
      project: "ProjectBeta",
      displayOrder: 9,
    },
    {
      start: new Date(currentDate.getFullYear(), currentDate.getMonth(), 18),
      end: new Date(currentDate.getFullYear(), currentDate.getMonth(), 20),
      name: "Beta - Release",
      id: "BetaTask4",
      progress: 0,
      dependencies: [
        { id: "BetaTask3", type: "SF" },
      ],
      type: "milestone",
      project: "ProjectBeta",
      displayOrder: 10,
    },

    // Cross-project dependency (optional, for advanced demo)
    {
      start: new Date(currentDate.getFullYear(), currentDate.getMonth(), 21),
      end: new Date(currentDate.getFullYear(), currentDate.getMonth(), 23),
      name: "Celebration (Alpha & Beta)",
      id: "Celebration",
      progress: 0,
      dependencies: [
        { id: "AlphaTask4", type: "FS" },
        { id: "BetaTask4", type: "FS" },
      ],
      type: "task",
      displayOrder: 11,
    },
  ];
  return tasks;
}

export function getStartEndDateForProject(tasks: Task[], projectId: string) {
  const projectTasks = tasks.filter(t => t.project === projectId);
  let start = projectTasks[0].start;
  let end = projectTasks[0].end;

  for (let i = 0; i < projectTasks.length; i++) {
    const task = projectTasks[i];
    if (start.getTime() > task.start.getTime()) {
      start = task.start;
    }
    if (end.getTime() < task.end.getTime()) {
      end = task.end;
    }
  }
  return [start, end];
}
