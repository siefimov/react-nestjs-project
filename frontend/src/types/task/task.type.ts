export const TASK_STATUS = {
  TODO: "todo",
  IN_PROGRESS: "in_progress",
  DONE: "done",
} as const;

export type TaskStatus = (typeof TASK_STATUS)[keyof typeof TASK_STATUS];

export type Task = {
  id: number;
  title: string;
  description?: string;
  projectId: number;
  assignedUserId: number;
  status: TaskStatus;
  createdAt: string;
  updatedAt: string;
};
